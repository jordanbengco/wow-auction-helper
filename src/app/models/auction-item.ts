export class AuctionItem {
    item: number;
    petSpeciesId: number;
    name: string = 'Unavailable';
    owner: string;
    ownerRealm: string;
    auctions: Auction[];
    estDemand: number = 0;
    avgDailySold: number = 0;
    avgDailyPosted: number = 0;
    regionSaleAvg: number = 0;
    mktPrice: number = 0;
    vendorSell: number = 0;
    quantityTotal: number = 0;
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
