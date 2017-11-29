import Dexie from 'dexie';

/**
 * A class to contain the dexie instance
 * TODO: Get brains
 */
export class Database {
  public static db: Dexie;
  public static readonly TSM_TABLE_COLUMNS =
    'Id,Name,Level,VendorBuy,VendorSell,MarketValue,MinBuyout,HistoricalPrice,' +
    'RegionMarketAvg,RegionMinBuyoutAvg,RegionHistoricalPrice,RegionSaleAvg,' +
    'RegionAvgDailySold,RegionSaleRate';
  public static readonly WOWUCTION_TABLE_COLUMNS = 'id,mktPrice,avgDailyPosted,avgDailySold,estDemand,realm';
  public static readonly ITEM_TABLE_COLUMNS = 'id,name,icon,itemLevel,itemClass,itemSubClass,quality,itemSpells,' +
    'itemSource,buyPrice,sellPrice,itemBind,minFactionId,minReputation';
  public static readonly PET_TABLE_COLUMNS = 'speciesId,petTypeId,creatureId,name,icon,description,source';
  public static readonly AUCTIONS_TABLE_COLUMNS = 'auc,item,owner,ownerRealm,bid,buyout,quantity,timeLeft,' +
    'rand,seed,context,realm,timestamp';
  public static readonly DB_TABLES = {
    TSM_TABLE_COLUMNS: Database.WOWUCTION_TABLE_COLUMNS,
    WOWUCTION_TABLE_COLUMNS: Database.WOWUCTION_TABLE_COLUMNS,
    ITEM_TABLE_COLUMNS: Database.ITEM_TABLE_COLUMNS,
    PET_TABLE_COLUMNS: Database.PET_TABLE_COLUMNS,
    AUCTIONS_TABLE_COLUMNS: Database.AUCTIONS_TABLE_COLUMNS
  };

  public static init(): Promise<any> {
    Database.db = new Dexie('wah-db');
    Database.db.version(2).stores({
      auctions: Database.AUCTIONS_TABLE_COLUMNS,
      wowuction: Database.WOWUCTION_TABLE_COLUMNS,
      tsm: Database.TSM_TABLE_COLUMNS,
      items: Database.ITEM_TABLE_COLUMNS,
      pets: Database.PET_TABLE_COLUMNS
    }).upgrade(() => {
      console.log('Upgraded db');
    });
    Database.db.version(1).stores({
      auctions: Database.AUCTIONS_TABLE_COLUMNS,
      wowuction: Database.WOWUCTION_TABLE_COLUMNS,
      tsm: Database.TSM_TABLE_COLUMNS,
      items: `id,name,icon,itemClass,itemSubClass,quality,itemSpells,itemSource`,
      pets: Database.PET_TABLE_COLUMNS
    });
    return Database.db.open()
      .then(() => {
        console.log('wah-db successfully started');
      }).catch(error => {
        console.log('Unable to start indexedDB', error);
      });
  }
}
