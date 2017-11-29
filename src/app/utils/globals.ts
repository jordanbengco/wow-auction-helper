import { TSMItem } from './../models/tsm-item';
import { IUser } from './interfaces';
import { itemClasses, watchlist } from './objects';
import { AuctionItem } from '../models/auction-item';
import { ItemDTO } from '../models/item';

export let lists = {
  isDownloading: true,
  myAuctions: [],
  auctions: new Map<number, AuctionItem>(),
  wowuction: [],
  tsm: new Map<number, TSMItem>(),
  items: new Map<number, ItemDTO>(),
  itemsArray: [],
  itemRecipes: {},
  pets: [],
  recipes: [],
  recipesIndex: [],
  customPrices: {},
  myRecipes: []
};

lists.customPrices = { '124124': 3000000, '120945': 500000, '115524': 200000, '151568': 3000000 };

/**
 * Used to get the icon url for a given item or pet.
 * @param  {Auction or Item} auction It takes a auction or Item object.
 * @return {string}         [description]
 */
export function getIcon(auction): string {
  const itemID = auction.item !== undefined ? auction.item : auction.itemID;
  let url = 'http://blzmedia-a.akamaihd.net/wow/icons/56/', icon;
  try {
    if (auction.petSpeciesId !== undefined && lists.pets !== undefined) {
      if (lists.pets[auction.petSpeciesId] === undefined) {
        // getPet(auction.petSpeciesId);
      }
      icon = lists.pets[auction.petSpeciesId].icon;
    } else if (lists.items[itemID] !== undefined) {
      icon = lists.items[itemID].icon;
    }
  } catch (err) { console.log(err, auction, itemID); }

  if (icon === undefined) {
    url += 'inv_scroll_03.jpg';
  } else {
    url += icon + '.jpg';
  }
  return url;
}


export const API_KEY = '9crkk73wt4ck6nmsuzycww4ruq2z4t95';
export const itemContext = [
  'Drop', 'World drop', 'Raid (old)', 'Normal dungeon',
  'Raid finder', 'Heroic', 'Mythic', 'Player drop', 'Unknown',
  'Gathering', 'Unknown', 'Drop', 'Unknown', 'Profession', 'Vendor',
  'Vendor', 'Unknown', 'Unknown', 'Unknown', 'Unknown', 'Unknown',
  'Unknown', 'Timewalking', 'Trash drop', 'Unknown', 'World drop',
  'World drop', 'Unknown', 'Unknown', 'Unknown', 'Mythic dungeon',
  'Garrison mission'];
