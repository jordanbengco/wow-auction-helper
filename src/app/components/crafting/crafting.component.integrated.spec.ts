/**
 * This test is created for testing the functions in a isolated manner.
 * To see if it works in a 'clean' environment.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '../../app.module';

import { CraftingComponent } from './crafting.component';
import { calcCost, user, lists, getPet, db } from '../../utils/globals';
import { testObjects } from '../../utils/testdata';


// TODO: DO them tests!
describe('CraftingComponent', () => {
	let component: CraftingComponent;
	let fixture: ComponentFixture<CraftingComponent>;
	// Elixir of Lion's Strength recipe
	const recipe = {
		spellID: 2329,
		profession: 'Alchemy',
		itemID : 2454,
		name: 'Elixir of Lion\'s Strength',
		minCount: 1,
		maxCount: '1',
		reagents: [
			{ itemID: 2449, name: 'Earthroot', count: '1.00', altered: true },
			{ itemID: 765, name: 'Silverleaf', count: '1.00', altered: true },
			{ itemID: 3371, name: 'Crystal Vial', count: '1.00', altered: true }
		]
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AppModule
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CraftingComponent);
		component = fixture.componentInstance;

		// Setting up items
		lists.tsm[2449] = {MarketValue: 1, RegionSaleRate: 200};
		// Elixir of Lion's Strength
		lists.auctions[2454] = {
			auc: 123456123,
			item: 2454,
			owner: 'Lynx',
			ownerRealm: 'Emerald Dream',
			bid: 113050,
			buyout: 400,
			quantity: 2,
			timeLeft: 'VERY_LONG',
			rand: 0,
			seed: 0,
			context: 0,
			name: 'Elixir of Lion\'s Strength',
			estDemand: 7,
			avgDailySold: 0.1,
			avgDailyPosted: 0,
			mktPrice: 74101,
			regionSaleAvg: 14985,
			vendorSell: 5,
			quantity_total: 20,
			auctions: []
		};
		// Earthroot
		lists.auctions[2449] = {
			auc: 182846817,
			item: 2449,
			owner: 'Acantis',
			ownerRealm: 'Terenas',
			bid: 48,
			buyout: 60,
			quantity: 20,
			timeLeft: 'LONG',
			rand: 0,
			seed: 0,
			context: 0,
			name: 'Earthroot',
			estDemand: 39,
			avgDailySold: 42.12,
			avgDailyPosted: 108,
			mktPrice: 28526,
			regionSaleAvg: 11364,
			vendorSell: 20,
			quantity_total: 112,
			auctions: [
				{ item: 2449, name: 'Earthroot', owner: 'Cleveage', ownerRealm: 'Terenas', buyout: 917240, quantity: 20, bid: 917240 },
				{ item: 2449, name: 'Earthroot', owner: 'Velniukas', ownerRealm: 'Emerald Dream', buyout: 35567, quantity: 1, bid: 35567 },
				{ item: 2449, name: 'Earthroot', owner: 'Velniukas', ownerRealm: 'Emerald Dream', buyout: 35567, quantity: 1, bid: 35567 },
				{ item: 2449, name: 'Earthroot', owner: 'Velniukas', ownerRealm: 'Emerald Dream', buyout: 35567, quantity: 1, bid: 35567 },
				{ item: 2449, name: 'Earthroot', owner: 'Lillidove', ownerRealm: 'Emerald Dream', buyout: 200000, quantity: 20, bid: 170600 },
				{ item: 2449, name: 'Earthroot', owner: 'Tenraii', ownerRealm: 'Emerald Dream', buyout: 710000, quantity: 20, bid: 545000 },
				{ item: 2449, name: 'Earthroot', owner: 'Tenraii', ownerRealm: 'Emerald Dream', buyout: 710000, quantity: 20, bid: 545000 },
				{ item: 2449, name: 'Earthroot', owner: 'Tenraii', ownerRealm: 'Emerald Dream', buyout: 213000, quantity: 6, bid: 163500 },
				{ item: 2449, name: 'Earthroot', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 180000, quantity: 20, bid: 150000 },
				{ item: 2449, name: 'Earthroot', owner: 'Acantis', ownerRealm: 'Emerald Dream', buyout: 180, quantity: 3, bid: 144 }
			]
		};
		lists.items[2449] = {
			id: '2449',
			name: 'Earthroot',
			icon: 'inv_misc_herb_07',
			itemLevel: 10,
			itemClass: '7',
			itemSubClass: '9',
			quality: 1,
			itemSpells: [],
			buyPrice: 80,
			sellPrice: 20,
			itemBind: 0,
			minFactionId: '0',
			minReputation: 0,
			isDropped: true
		};
		// Silverleaf
		lists.auctions[765] = {
			auc: 182544409,
			item: 765,
			owner: 'Acantis',
			ownerRealm: 'Emerald Dream',
			bid: 24,
			buyout: 30,
			quantity: 16,
			timeLeft: 'SHORT',
			rand: 0,
			seed: 0,
			context: 0,
			name: 'Silverleaf',
			estDemand: 49,
			avgDailySold: 66.64,
			avgDailyPosted: 136,
			mktPrice: 6572,
			regionSaleAvg: 12903,
			vendorSell: 10,
			quantity_total: 103,
			auctions: [
				{ item: 765, name: 'Silverleaf', owner: 'Cy', ownerRealm: 'Emerald Dream', buyout: 158400, quantity: 16, bid: 150480 },
				{ item: 765, name: 'Silverleaf', owner: 'Pikciurna', ownerRealm: 'Emerald Dream', buyout: 49500, quantity: 5, bid: 40225 },
				{ item: 765, name: 'Silverleaf', owner: 'Pikciurna', ownerRealm: 'Emerald Dream', buyout: 49500, quantity: 5, bid: 40225 },
				{ item: 765, name: 'Silverleaf', owner: 'Pikciurna', ownerRealm: 'Emerald Dream', buyout: 49500, quantity: 5, bid: 40225 },
				{ item: 765, name: 'Silverleaf', owner: 'Lionia', ownerRealm: 'Emerald Dream', buyout: 14020, quantity: 2, bid: 12020 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Minnalock', ownerRealm: 'Terenas', buyout: 40000, quantity: 5, bid: 30000 },
				{ item: 765, name: 'Silverleaf', owner: 'Acantis', ownerRealm: 'Emerald Dream', buyout: 450, quantity: 15, bid: 360 }
			]
		};
		lists.items[765] = {
			id: '765',
			name: 'Silverleaf',
			icon: 'inv_misc_herb_10',
			itemLevel: 5,
			itemClass: '7',
			itemSubClass: '9',
			quality: 1,
			itemSpells: [],
			buyPrice: 40,
			sellPrice: 10,
			itemBind: 0,
			minFactionId: '0',
			minReputation: 0,
			isDropped: true
		};
		// Crystal Vial
		lists.auctions[3371] = {
			auc: 183364693,
			item: 3371,
			owner: 'Lynxa',
			ownerRealm: 'Emerald Dream',
			bid: 113050,
			buyout: 119000,
			quantity: 10,
			timeLeft: 'VERY_LONG',
			rand: 0,
			seed: 0,
			context: 0,
			name: 'Crystal Vial',
			estDemand: 11,
			avgDailySold: 48.73,
			avgDailyPosted: 443,
			mktPrice: 74101,
			regionSaleAvg: 14985,
			vendorSell: 5,
			quantity_total: 20,
			auctions: [
				{item: 3371, name: 'Crystal Vial', owner: 'Lynxa', ownerRealm: 'Emerald Dream', buyout: 1190000, quantity: 10, bid: 1130500},
				{item: 3371, name: 'Crystal Vial', owner: 'Lynxa', ownerRealm: 'Emerald Dream', buyout: 1190000, quantity: 10, bid: 1130500}
			]
		};
		lists.items[3371] = {
			id: '3371',
			name: 'Crystal Vial',
			icon: 'inv_alchemy_leadedvial',
			itemLevel: 1,
			itemClass: '7',
			itemSubClass: '11',
			quality: 1,
			itemSpells: [],
			buyPrice: 150,
			sellPrice: 5,
			itemBind: 0,
			minFactionId: '0',
			minReputation: 0,
			isDropped: false
		};
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});

	it('should be able to calculate price when one material is sold by vendor and is not dropped', () => {
		lists.items[3371].isDropped = false;
		component.crafts[0] = recipe;
		component.calculateCosts(component.crafts[0]);
		expect(component.crafts[0]['cost']).toEqual(240);
		expect(component.crafts[0]['profit']).toEqual(160);
	});

	it('should be able to calculate price when no materials are sold by vendor ', () => {
		component.crafts[0] = recipe;
		lists.items[3371].isDropped = true;
		component.calculateCosts(component.crafts[0]);
		expect(component.crafts[0]['cost']).toEqual(119090);
		expect(component.crafts[0]['profit']).toEqual(-118690);
	});

	it('should be able to calculate price when there is a customprice override and item is sold by vendor', () => {
		component.crafts[0] = recipe;
		lists.items[3371].isDropped = false;
		lists.customPrices[3371] = 999;
		component.calculateCosts(component.crafts[0]);
		expect(component.crafts[0]['cost']).toEqual(1089);
		expect(component.crafts[0]['profit']).toEqual(-689);
	});

	it('should be able to calculate price when there is a customprice override and item is not sold by vendor', () => {
		component.crafts[0] = recipe;
		lists.items[3371].isDropped = true;
		lists.customPrices[3371] = 999;
		component.calculateCosts(component.crafts[0]);
		// So that it won't affect other tests
		delete lists.customPrices[3371];
		expect(component.crafts[0]['cost']).toEqual(1089);
		expect(component.crafts[0]['profit']).toEqual(-689);
	});

	it('should be able to use the market value if the current buyout of the target item is above 200%', () => {
		lists.items[3371].isDropped = false;
		user.apiToUse = 'tsm';
		lists.auctions[2454].mktPrice = 1;
		component.crafts[0] = recipe;
		component.calculateCosts(component.crafts[0]);
		expect(component.crafts[0]['cost']).toEqual(240);
		expect(component.crafts[0]['profit']).toEqual(-239);
		lists.auctions[2454].mktPrice = 74101;
	});

	it('should be able to use subsequent craft cost, if requested for a given material', () => {
		/* TODO: !!
		lists.items[3371].isDropped = false;
		user.apiToUse = 'tsm';
		lists.auctions[2454].mktPrice = 1;
		component.crafts[0] = recipe;
		component.calculateCosts(component.crafts[0]);
		expect(component.crafts[0]['cost']).toEqual(240);
		expect(component.crafts[0]['profit']).toEqual(-239);
		lists.auctions[2454].mktPrice = 74101;*/
	});
});
