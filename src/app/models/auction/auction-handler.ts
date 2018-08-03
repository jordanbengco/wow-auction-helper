import { User } from './../user/user';
import { SharedService } from './../../services/shared.service';
import { Auction } from './auction';
import { AuctionItem } from './auction-item';
import { Crafting } from '../crafting/crafting';
import { Dashboard } from '../dashboard';
import { TradeVendors } from '../item/trade-vendors';
import { Seller } from '../seller';
import { AuctionPet } from './auction-pet';
import { Notifications } from '../user/notification';
import { WoWUction } from './wowuction';
import { PetsService } from '../../services/pets.service';
import { ProspectingAndMillingUtil } from '../../utils/prospect-milling.util';

export class AuctionHandler {
  /**
    * Organizes the auctions into groups of auctions per item
    * Used in the auction service.
    * @param auctions A raw auction array
    */
  public static organize(auctions: Array<AuctionItem>, petService?: PetsService): void {
    const t0 = performance.now();
    SharedService.auctionItems.length = 0;
    Object.keys(SharedService.auctionItemsMap)
      .forEach(key => {
        delete SharedService.auctionItemsMap[key];
      });

    SharedService.userAuctions.organizeCharacters(SharedService.user.characters);

    auctions.forEach(auc => {
      auc.auctions.forEach(a => {
        SharedService.userAuctions.addAuction(a, auc);
        if (!SharedService.pets[a.petSpeciesId] && petService) {
          console.log('Attempting to add pet');
          petService.getPet(a.petSpeciesId).then(p => {
            AuctionHandler.getItemName(auc);
            console.log('Fetched pet', SharedService.pets[a.petSpeciesId]);
          });
        } else {
          if (!SharedService.pets[a.petSpeciesId].auctions) {
            SharedService.pets[a.petSpeciesId].auctions = new Array<AuctionItem>();
          }
          SharedService.pets[a.petSpeciesId].auctions.push(SharedService.auctionItemsMap[a.item]);
        }
      });
    });
    const t1 = performance.now();
    console.log(`Organized in: ${ (t1 - t0) }ms`);

    // Checking if we have been undercutted etc
    SharedService.userAuctions.countUndercutAuctions(SharedService.auctionItemsMap);

    setTimeout(() => {

      // Trade vendors has to be done before crafting calc
      TradeVendors.setValues();

      Crafting.calculateCost();

      // Grouping auctions by seller
      Seller.organize();

      ProspectingAndMillingUtil.setCosts();

      // Dashboard -> Needs to be done after trade vendors
      Dashboard.addDashboards();

      SharedService.user.shoppingCart.restore();
      SharedService.user.shoppingCart.calculateCartCost();

      const t3 = performance.now();
      console.log(`Calculated in: ${ (t3 - t1) }ms`);
    }, 1);
  }

  private static auctionPriceHandler(): AuctionItem {
    return null;
  }

  private static getItemName(auction: AuctionItem): string {
    if (auction.petSpeciesId) {
      if (SharedService.pets[auction.petSpeciesId]) {
        return `${SharedService.pets[auction.petSpeciesId].name} - Level ${auction.petLevel} - Quality ${auction.petQualityId}`;
      }
      return 'Pet name missing';
    }
    return SharedService.items[auction.itemID] ?
      SharedService.items[auction.itemID].name : 'Item name missing';
  }

  private static useTSM(): boolean {
    return SharedService.user.apiToUse === 'tsm';
  }

  private static useWoWUction(): boolean {
    return SharedService.user.apiToUse === 'wowuction';
  }
}
