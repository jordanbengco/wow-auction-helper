import {Component, OnInit} from '@angular/core';
import {UserAuctionCharacter, UserAuctions} from '../../../models/auction/user-auctions';
import {SharedService} from '../../../services/shared.service';
import {Auction} from '../../../models/auction/auction';
import {ColumnDescription} from '../../../models/column-description';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'wah-my-auctions',
  templateUrl: './my-auctions.component.html',
  styleUrls: ['./my-auctions.component.scss']
})
export class MyAuctionsComponent implements OnInit {
  public static sortAsc: boolean;

  columns: Array<ColumnDescription> = new Array<ColumnDescription>();

  constructor(private _title: Title) {
    this._title.setTitle('WAH - My auctions');
  }

  public static getUndercutAmount(a: Auction): number {
    return (a.buyout / a.quantity) - SharedService.auctionItemsMap[Auction.getAuctionItemId(a)].buyout;
  }

  ngOnInit() {
    this.columns.push({key: 'name', title: 'Name', dataType: 'name'});
    this.columns.push({key: 'quantity', title: 'Stack size', dataType: 'number'});
    this.columns.push({
      key: 'undercutByAmount', title: 'Undercut by/item', dataType: 'gold', customSort: [{
        title: undefined,
        value: undefined,
        function: this.sortUndercut,
        isActive: true
      }]
    });
    this.columns.push({key: 'buyout', title: 'Buyout', dataType: 'gold'});
    this.columns.push({key: 'buyout', title: 'Buyout/item', dataType: 'gold-per-item'});
    this.columns.push({key: 'bid', title: 'Bid', dataType: 'gold', hideOnMobile: true});
    this.columns.push({key: 'bid', title: 'Bid/item', dataType: 'gold-per-item', hideOnMobile: true});

    if (SharedService.user.apiToUse !== 'none') {
      this.columns.push({key: 'mktPrice', title: 'Market value', dataType: 'gold', hideOnMobile: true});
      if (SharedService.user.apiToUse === 'tsm') {
        this.columns.push({key: 'regionSaleAvg', title: 'Avg sale price', dataType: 'gold', hideOnMobile: true});
      } else {
        this.columns.push({key: 'avgDailyPosted', title: 'Avg daily posted', dataType: 'number', hideOnMobile: true});
      }
      this.columns.push({key: 'avgDailySold', title: 'Daily sold', dataType: 'number', hideOnMobile: true});
      this.columns.push({key: 'regionSaleRate', title: 'Sale rate', dataType: 'percent', hideOnMobile: true});
    }

    this.columns.push({key: '', title: 'Actions', dataType: 'action', actions: ['buy', 'wowhead', 'item-info'], hideOnMobile: true});
  }

  getUserAuctions(): UserAuctions {
    return SharedService.userAuctions;
  }

  hasUserCharacters(): boolean {
    return SharedService.user.characters.length > 0;
  }

  getUserAuctionsCharacters(): Array<UserAuctionCharacter> {
    return SharedService.userAuctions.characters ? SharedService.userAuctions.characters : [];
  }


  sortUndercut(array: Array<Auction>): void {
    array.sort((a, b) => {
      if (MyAuctionsComponent.sortAsc) {
        return MyAuctionsComponent.getUndercutAmount(b) - MyAuctionsComponent.getUndercutAmount(a);
      } else {
        return MyAuctionsComponent.getUndercutAmount(a) - MyAuctionsComponent.getUndercutAmount(b);
      }
    });
    MyAuctionsComponent.sortAsc = !MyAuctionsComponent.sortAsc;
  }
}
