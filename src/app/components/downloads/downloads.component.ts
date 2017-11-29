import { Auctions } from '../../utils/auctions';
import { Component, OnInit, Input } from '@angular/core';
import { AuctionService } from '../../services/auctions.service';
import { CharacterService } from '../../services/character.service';
import { ItemService } from '../../services/item.service';
import { Router } from '@angular/router';
import { lists } from '../../utils/globals';
import { Database } from '../../utils/database';
import { Notification } from '../../utils/notification';
import Crafting from '../../utils/crafting';
import Pets from '../../utils/pets';
import { Item } from '../../utils/item';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {
  public static downloading = {
    items: false,
    api: false,
    auctions: false,
    recipes: false,
    pets: false
  };

  tempTimestamps = {
    pets: new Date(),
    recipes: new Date()
  };


  private lastModified: number;
  timeSinceLastModified: number;
  private oldTimeDiff: number;
  private auctionObserver = {};
  private itemObserver = {};
  private petObserver = {};
  private date: Date;
  showDropdown: boolean;
  constructor(private auctionService: AuctionService,
    private itemService: ItemService, private characterService: CharacterService,
    private router: Router) { }

  async ngOnInit() {
    await Database.init()
      .then(r => console.log('Database has successfully been started'))
      .catch(e => console.error('Database was not started', e));
    this.date = new Date();
    if (this.isRealmSet()) {
      try {
        if (localStorage.watchlist) {
          CharacterService.user.watchlist = JSON.parse(localStorage.watchlist);
          Object.keys(CharacterService.user.watchlist.items).forEach(k => {
            CharacterService.user.watchlist.items[k].forEach(w => {
              if (w.alert === undefined) {
                w['alert'] = true;
              }
            });
          });
          console.log('watchlist:', CharacterService.user.watchlist);
        }
      } catch (e) {
        console.log('app.component init', e);
      }

      await this.initAPI();

      await this.donloadRecipes();

      await this.downloadPets();

      await this.downloadItems();

      await Auctions.checkForUpdates(this.auctionService);

      await this.downloadAuctions(false);
      setInterval(() => this.checkForUpdate(), 60000);

      if (localStorage.getItem('custom_prices') !== null) {
        lists.customPrices = JSON.parse(localStorage.getItem('custom_prices'));
      }
    }
  }

  useTSM(): boolean {
    return CharacterService.user.apiToUse === 'tsm';
  }

  getDownloading(): any {
    return DownloadsComponent.downloading;
  }


  checkForUpdate() {
    console.log('checking for update');
    if (this.isRealmSet()) {
      this.auctionService.getLastUpdated()
        .then(r => {
          this.lastModified = r['lastModified'];
          this.setTimeSinceLastModified();
        });
    }
  }

  setTimeSinceLastModified() {
    this.date = new Date();

    const updateTime = new Date(this.lastModified).getMinutes(),
      currentTime = this.date.getMinutes();

    // Checking if there is a new update available
    if (this.lastModified && this.lastModified > 0 && this.timeDiff(updateTime, currentTime) < this.oldTimeDiff && !lists.isDownloading) {
      if (CharacterService.user.notifications.isUpdateAvailable) {
        Notification.send(
          'New auction data is available!',
          `Downloading new auctions for ${
          CharacterService.user.realm}@${
          CharacterService.user.region}.`,
          this.router);
      }
      Auctions.download(this.auctionService, this.router);
    }

    this.timeSinceLastModified = this.timeDiff(updateTime, currentTime);
    this.oldTimeDiff = this.timeSinceLastModified;
  }

  timeDiff(updateTime, currentTime) {
    return (updateTime > currentTime ?
      (60 - updateTime + currentTime) : currentTime - updateTime);
  }

  exists(value): boolean {
    return value !== null && value !== undefined && value.length > 0;
  }

  isRealmSet(): boolean {
    return CharacterService.user.realm.length > 0 &&
      CharacterService.user.region.length > 0;
  }

  isCharacterSet(): boolean {
    return this.isRealmSet() && this.exists(CharacterService.user.character);
  }

  getTimestamp(type: string): any {
    return localStorage[`timestamp_${type}`];
  }

  initAPI(): void {
    if (
      this.useTSM() &&
      localStorage.getItem('api_tsm') !== null &&
      localStorage.getItem('api_tsm') !== undefined &&
      localStorage.getItem('api_tsm').length > 0 &&
      localStorage.getItem('api_tsm') !== 'null') {
      if (new Date(
          localStorage.getItem('timestamp_tsm'))
            .toDateString() !== new Date().toDateString()) {
        this.downloadTSM(false);
        console.log('TSM done');
      } else if (this.useTSM()) {
        DownloadsComponent.downloading.api = true;
        Database.db.table('tsm').toArray().then(
          result => {
            if (result.length > 0) {
              result.forEach(r => {
                lists.tsm[r.Id] = r;
              });
              console.log('Loaded TSM from local DB');
            } else {
              this.downloadTSM(false);
            }
            DownloadsComponent.downloading.api = false;
          });
      }
    }
  }

  donloadRecipes(): void {
    DownloadsComponent.downloading.recipes = true;
    Crafting.download(this.itemService)
      .then(r => {
        DownloadsComponent.downloading.recipes = false;
        this.tempTimestamps.recipes = new Date();
      }).catch(r => DownloadsComponent.downloading.recipes = false);
  }

  downloadPets(): void {
    DownloadsComponent.downloading.pets = true;
    Pets.download(this.itemService)
      .then(r => {
        DownloadsComponent.downloading.pets = false;
        this.tempTimestamps.pets = new Date();
      }).catch(r => DownloadsComponent.downloading.pets = false);
  }

  downloadItems(force?: boolean): void {
    DownloadsComponent.downloading.items = true;
    Item.download(this.itemService, force)
      .then(r => DownloadsComponent.downloading.items = false)
      .catch(r => DownloadsComponent.downloading.items = false);
  }

  checkForUpdates(): void {
    Auctions.checkForUpdates(this.auctionService);
  }

  downloadAuctions(forceUpdate?: boolean): void {
    if (forceUpdate === undefined) {
      forceUpdate = false;
    }
    DownloadsComponent.downloading.auctions = true;
    Auctions.download(this.auctionService, this.router, forceUpdate)
      .then(r => DownloadsComponent.downloading.auctions = false)
      .catch(r => DownloadsComponent.downloading.auctions = false);
  }

  downloadTSM(rebuildAuctions: boolean): void {
    DownloadsComponent.downloading.api = true;
    Auctions.downloadTSM(this.auctionService)
      .then(tsm => {
        DownloadsComponent.downloading.api = false;
        if (rebuildAuctions) {
          Database.db.table('auctions').toArray().then(a => {
            Auctions.buildAuctionArray(a, this.router);
          });
        }
      })
      .catch(e => DownloadsComponent.downloading.api = false);
  }

  isDownloading(): boolean {
    return DownloadsComponent.downloading.api || DownloadsComponent.downloading.auctions || DownloadsComponent.downloading.items
      || DownloadsComponent.downloading.pets || DownloadsComponent.downloading.recipes;
  }
}
