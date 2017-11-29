export class AuctionItem {
    item: number;
    petSpeciesId: number;
    name = 'Unavailable';
    owner: string;
    ownerRealm: string;
    auctions: Auction[];
    estDemand = 0;
    avgDailySold = 0;
    avgDailyPosted = 0;
    regionSaleAvg = 0;
    mktPrice = 0;
    vendorSell = 0;
    quantityTotal = 0;
}

class Auction {
    auc: number;
    item: number;
    bid: number;
    buyout: number;
    owner: string;
    ownerRealm: string;
    quantity: number;
    timeLeft: string;
    context: number;
    rand: number;
    seed: number;
}
