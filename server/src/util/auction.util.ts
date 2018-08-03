import { Request, Response } from 'express';
import * as request from 'request';
import * as mysql from 'mysql';
import { getLocale } from '../util/locales';
import { safeifyString } from './string.util';
import { Item } from '../models/item/item';
import { BLIZZARD_API_KEY, DATABASE_CREDENTIALS } from './secrets';
import { ItemLocale } from '../models/item/item-locale';
import { ItemQuery } from '../queries/item.query';
import { AuctionItem } from '../models/auction/auction-item';
import { Auction } from '../models/auction/auction';
import { AuctionPet } from '../models/auction/auction-pet';
const PromiseThrottle: any = require('promise-throttle');
// const request: any = require('request');
const RequestPromise = require('request-promise');

export class AuctionUtil {
  public static getAuctions(req: Request, res: Response): void {
    const url = req.body.url;

    if (url && url.indexOf('.worldofwarcraft.com/auction-data') !== -1) {
      request.get(url).pipe(res);
    } else {
      res.send({
        realms: [],
        auctions: []
      });
    }
  }

  public static getOrganizedAuctions(req: Request, res: Response): void {
    const url = req.body.url;

    if (url && url.indexOf('.worldofwarcraft.com/auction-data') !== -1) {
      request.get(url, (error, response, body) => {
        if (error) {
          res.send({
            realms: [],
            auctions: []
          });
          console.error('getOrganizedAuctions', error);
          return;
        }
        res.send(
          AuctionUtil.organizeAuctions(JSON.parse(body)));
      });
    } else {
      res.send({
        realms: [],
        auctions: []
      });
    }
  }

  public static getWoWUction(req: any, res: Response): void {
    AuctionUtil.processWoWUction(
      res,
      `http://www.wowuction.com/${
      req.body.region
      }/${
        req.body.realm
      }/alliance/Tools/RealmDataExportGetFileStatic?token=${
        req.body.key
      }`
    );
  }

  private static processWoWUction(res: Response, wowUctionURL: string): void {
    request.get(wowUctionURL, (err, re, body) => {
      const list: any[] = [],
        obj = {};
      let tempObj: any = {},
        isFirst = true;
      // 5 == itemID, 7 == market price,
      // 14 == Avg Daily Posted, 15 == Avg Estimated Daily Sold,
      // 16 == Estimated demand
      body.split('\n').forEach(l => {
        if (isFirst) {
          isFirst = false;
          // console.log(l.split('\t'));
        } else {
          tempObj = l.split('\t');
          list.push({
            id: parseInt(tempObj[4], 10),
            mktPrice: parseInt(tempObj[6]),
            avgDailyPosted: parseFloat(tempObj[15]),
            avgDailySold: parseFloat(tempObj[16]),
            estDemand: parseFloat(tempObj[17]),
            dailyPriceChange: parseFloat(tempObj[14])
          });
        }
      });
      res.send(list);
    });
  }


  public static organizeAuctions(auctionsResponse: any): any {
    const t0 = performance.now();
    const map = new Map<any, AuctionItem>(),
      auctionItems: AuctionItem[] = [];
    auctionsResponse['auctions'].forEach((a: Auction) => {
      if (a.petSpeciesId && !map[`${a.item}-${a.petSpeciesId}-${a.petLevel}-${a.petQualityId}`]) {
        const petId = `${a.item}-${a.petSpeciesId}-${a.petLevel}-${a.petQualityId}`;
        map[petId] = AuctionUtil.newAuctionItem(a);
        auctionItems.push(map[petId]);
      } else if (!map[a.item]) {
        map[a.item] = AuctionUtil.newAuctionItem(a);
        auctionItems.push(map[a.item]);
      } else {
        AuctionUtil.updateAuctionItem(a, map[a.item]);
      }
    });
    const t1 = performance.now();
    console.log(`Organized in: ${ (t1 - t0) }ms`);
    return {
      auctions: auctionItems,
      realms: auctionsResponse.realms
    };
  }

  private static newAuctionItem(auction: Auction): AuctionItem {
    const tmpAuc = new AuctionItem();
    tmpAuc.itemID = auction.item;
    tmpAuc.petSpeciesId = auction.petSpeciesId;
    tmpAuc.petLevel = auction.petLevel;
    tmpAuc.petQualityId = auction.petQualityId;
    tmpAuc.name = '';
    tmpAuc.owner = auction.owner;
    tmpAuc.ownerRealm = auction.ownerRealm;
    tmpAuc.buyout = auction.buyout / auction.quantity;
    tmpAuc.bid = auction.bid / auction.quantity;
    tmpAuc.quantityTotal += auction.quantity;
    tmpAuc.vendorSell = 0;
    tmpAuc.auctions.push(auction);

    return tmpAuc;
  }

  private static updateAuctionItem(auction: Auction, ai: AuctionItem): void {
    /* TODO: Should this, or should it not be excluded?
    if (auction.buyout === 0) {
      return;
    }*/
    const id = auction.petSpeciesId ?
      new AuctionPet(auction.petSpeciesId, auction.petLevel, auction.petQualityId).auctionId : auction.item;
    if (ai.buyout === 0 || (ai.buyout > auction.buyout && auction.buyout > 0)) {
      ai.owner = auction.owner;
      ai.buyout = auction.buyout / auction.quantity;
      ai.bid = auction.bid / auction.quantity;
    }
    ai.quantityTotal += auction.quantity;
    ai.auctions.push(auction);
  }
}