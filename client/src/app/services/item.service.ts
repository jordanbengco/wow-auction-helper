import {Injectable, ErrorHandler, EventEmitter} from '@angular/core';
import {SharedService} from './shared.service';
import {HttpClient} from '@angular/common/http';
import {Item} from '../models/item/item';
import {Endpoints} from './endpoints';
import {GameBuild} from '../utils/game-build.util';
import {DatabaseService} from './database.service';
import {WoWHeadSoldBy} from '../models/item/wowhead';
import {ErrorReport} from '../utils/error-report.util';
import {Angulartics2} from 'angulartics2';
import {ProspectingAndMillingUtil} from '../utils/prospect-milling.util';
import {MatSnackBar} from '@angular/material';
import {ItemOverrides} from '../overrides/item.overrides';
import {Recipe} from '../models/crafting/recipe';
import {Platform} from '@angular/cdk/platform';

class ItemResponse {
  timestamp: Date;
  items: Item[];
}

@Injectable()
export class ItemService {
  public static missingQueue: Map<string, number> = new Map<string, number>();
  public static itemSelection: EventEmitter<number> = new EventEmitter<number>();
  readonly LOCAL_STORAGE_TIMESTAMP = 'timestamp_items';

  constructor(private _http: HttpClient,
              private dbService: DatabaseService,
              public snackBar: MatSnackBar,
              private angulartics2: Angulartics2,
              public platform: Platform) {
  }

  addItem(itemID: number): Promise<any> {
    console.log('Attempting to add item data for ' + itemID);
    return this._http.post(
      Endpoints.getLambdaUrl(`item/${itemID}`), {
        locale: localStorage['locale']
      })
      .toPromise()
      .then((item: Item) => {
        console.log('downloaded item', item);
        SharedService.items[item.id] = (item as Item);
        if (SharedService.auctionItemsMap[item.id]) {
          SharedService.auctionItemsMap[item.id].name = item.name;
          SharedService.auctionItemsMap[item.id].vendorSell = item.sellPrice;
        }
        this.dbService.addItem(item);
        return item;
      }).catch(error => {
        console.error('Could not get item with ID ' + itemID, error);
        ErrorReport.sendHttpError(error);
        return error;
      }) as Promise<any>;
  }

  async getItems(): Promise<any> {
    const locale = localStorage['locale'];
    let timestamp = localStorage[this.LOCAL_STORAGE_TIMESTAMP];
    console.log('Downloading items');
    SharedService.downloading.items = true;
    if (!timestamp) {
      this.dbService.clearItems();
      SharedService.itemsUnmapped.length = 0;
      this.openSnackbar('Downloading the item DB for first time use. This might take a couple minutes(~27 MB).');
      await this._http.get(`https://s3-eu-west-1.amazonaws.com/wah-data/items-${locale}.json.gz`)
        .toPromise()
        .then((response: ItemResponse) => {
          SharedService.itemsUnmapped = [];
          Object.keys(SharedService.items).forEach(id =>
            delete SharedService.items[id]);
          timestamp = response.timestamp;
          this.handleItems(response);
        })
        .catch(error => {
          ErrorReport.sendHttpError(error);
        });
    }
    SharedService.downloading.items = true;
    return this._http.post(
      Endpoints.getLambdaUrl(`item`),
      {
        locale: locale,
        timestamp: timestamp ? timestamp : new Date('2000-06-30').toJSON()
      })
      .toPromise()
      .then(items => this.handleItems(items as ItemResponse))
      .catch(error => {
        SharedService.downloading.items = false;
        console.error('Items download failed', error);
        ErrorReport.sendHttpError(error);
      });
  }

  async addMissingItems() {
    const ids = Object.keys(ItemService.missingQueue);
    if (ids.length === 0 || ids.length > 100) {
      return;
    }
    ids.forEach(async id =>
      await this.addItem(ItemService.missingQueue[id]));
  }

  handleItems(items: ItemResponse): void {
    const missingItems: number[] = [],
      noItems = SharedService.itemsUnmapped.length === 0;
    SharedService.downloading.items = false;

    items.items.forEach((item: Item) => {
      if (SharedService.items[item.id]) {
        Object.keys(item).forEach(key => {
          SharedService.items[item.id][key] = item[key];
        });
        if (noItems) {
          SharedService.itemsUnmapped.push(item);
        }
      } else {
        SharedService.itemsUnmapped.push(item);
      }
    });

    SharedService.itemsUnmapped.forEach((item: Item) => {
      // Making sure that the tradevendor item names are updated in case of locale change
      if (SharedService.tradeVendorMap[item.id]) {
        SharedService.tradeVendorMap[item.id].name = item.name;
      }

      if (item.itemClass === 8) {
        item.itemClass = 0;
        item.itemSubClass = 6;
      }

      SharedService.items[item.id] = item;

      if (item.itemSource.containedInItem && item.itemSource.containedInItem.length > 0) {
        item.itemSource.containedInItem.forEach(i =>
          this.setLocaleForSourceItems(i, missingItems));
      }
      if (item.itemSource.milledFrom && item.itemSource.milledFrom.length > 0) {
        item.itemSource.milledFrom.forEach(i =>
          this.setLocaleForSourceItems(i, missingItems));
      }
      if (item.itemSource.prospectedFrom && item.itemSource.prospectedFrom.length > 0) {
        item.itemSource.prospectedFrom.forEach(i =>
          this.setLocaleForSourceItems(i, missingItems));
      }

      this.addItemToBoughtFromVendorList(item);
    });

    if (missingItems.length > 0) {
      // TODO: when I have time -> this.addItems(missingItems);
    }

    if (!this.platform.WEBKIT) {
      this.dbService.addItems(items.items);
      localStorage[this.LOCAL_STORAGE_TIMESTAMP] = items.timestamp;
    }
    SharedService.events.items.emit(true);
    console.log('Items download is completed');
  }

  setLocaleForSourceItems(item: any, missingItems: number[]): void {
    if (SharedService.items[item.id]) {
      item.name = SharedService.items[item.id].name;
    } else {
      missingItems.push(item.id);
    }
  }

  updateItem(itemID: number): Promise<any> {
    return this._http.patch(Endpoints.getUrl(`item/${itemID}`), {})
      .toPromise() as Promise<any>;
  }

  /**
   * Throtteled adding of missing items
   *
   * @param {Array<number>} itemsToAdd A list of item id's that needs to be added
   * @param {number} [i] the next index to add
   * @returns {void}
   * @memberof ItemService
   */
  addItems(itemsToAdd: Array<number>, i?: number): void {
    if (!i) {
      i = 0;
    }

    if (itemsToAdd.length === 0) {
      return;
    }

    setTimeout(() => {
      if (itemsToAdd[i]) {
        SharedService.items[i] = new Item();
        this.addItem(itemsToAdd[i]);
      }

      i++;
      if (i === itemsToAdd.length) {
        console.log(`Done adding ${i} items`);
        return;
      } else {
        this.addItems(itemsToAdd, i);
      }
    }, 100);
  }

  addItemToBoughtFromVendorList(item: Item): void {
    if (item.itemSource && item.itemSource.soldBy) {
      if (ItemOverrides.NOT_SOLD_BY_VENDOR[item.id]) {
        item.itemSource.soldBy = [];
        item.isBoughtForGold = false;
        return;
      }
      item.itemSource.soldBy.forEach((soldBy: WoWHeadSoldBy) => {
        item.isBoughtForGold = !soldBy.currency && soldBy.cost > 0;
        item.vendorBoughtLimit = soldBy.stock;
      });
    }
  }

  private openSnackbar(message: string): void {
    this.snackBar.open(message, 'Ok', {duration: 3000});
  }
}
