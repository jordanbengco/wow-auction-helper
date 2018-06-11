import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketResetComponent } from './market-reset.component';
import { TestModule } from '../../../modules/test.module';
import { Auction } from '../../../models/auction/auction';
import { AuctionHandler } from '../../../models/auction/auction-handler';
import { SharedService } from '../../../services/shared.service';

fdescribe('MarketResetComponent', () => {
  let component: MarketResetComponent;
  let fixture: ComponentFixture<MarketResetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestModule ]
    })
    .compileComponents();
  }));

  beforeAll(() => {
    const auctions = [
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 1, 'an owner', 'realm'),
      new Auction(0, 1, 100, 200, 'an owner', 'realm'),
      new Auction(0, 1, 200, 1, 'an owner', 'realm')
    ];
    SharedService.tsm[1] = {
       Id: 1,
       Name: 'Fiendish Leather',
       Level: 	101,
       Class: 'Recipe',
       SubClass: 'Enchanting',
       VendorBuy: 0,
       VendorSell : 1,
       MarketValue: 150,
       MinBuyout: 100,
       Quantity: 2,
       NumAuctions: 2,
       HistoricalPrice: 67168841,
       RegionMarketAvg: 67056881,
       RegionMinBuyoutAvg: 68470724,
       RegionQuantity: 1,
       RegionHistoricalPrice: 69200725,
       RegionSaleAvg: 21403126,
       RegionAvgDailySold: 0.02,
       RegionSaleRate: 0.02
    };
    AuctionHandler.organize(auctions);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getTargetMVPrice', () => {});

  describe('isMinimumProfitPercentMatch', () => {});

  describe('isTargetPriceMatch', () => {});

  describe('isCountMatch', () => {});

  describe('isMaxCostMatch', () => {
    it('A user should be able to set a max limit on how much they wish to invest per item', () => {
      component.form.controls.costLimit.setValue(400);
      component.setResults();
      expect(component.sum.sumCost).toBeLessThanOrEqual(400);
    });
  });
});
