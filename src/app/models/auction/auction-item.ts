import { Auction } from './auction';
import { ItemBonus } from '../item/item-bonuses';

export class AuctionItem {
  itemID: number;
  petSpeciesId?: number;
  name = 'Unavailable';
  bonusIDs: Array<ItemBonus> = new Array<ItemBonus>();
  buyout = 0;
  bid = 0;
  owner: string;
  ownerRealm: string;
  petLevel?: number;
  petQualityId?: number;
  auctions: Auction[] = new Array<Auction>();
  regionSaleRate = 0;
  avgDailySold = 0;
  avgDailyPosted = 0;
  regionSaleAvg = 0;
  mktPrice = 0;
  vendorSell = 0;
  quantityTotal = 0;
}
