import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ParentAuctionComponent } from '../auctions/parent.auctions.component';
import { lists } from '../../utils/globals';

@Component({
	selector: 'app-trade-vendor',
	templateUrl: 'trade.vendor.component.html',
	styleUrls: ['../auctions/auctions.component.css']
})
export class TradeVendorComponent extends ParentAuctionComponent implements OnInit{
	vendorIndex = 0;

	constructor(private titleService: Title) {
		super();
		this.titleService.setTitle('Wah - Trade vendor');
	}

	ngOnInit(): void {
		if (lists.auctions !== undefined && lists.auctions.length > 0) {
			this.setValues();
		} else {
			let refreshId = setInterval(() => {
				try {
					if (!lists.isDownloading && lists.auctions.length > 0) {
						this.setValues();
						clearInterval(refreshId);
					}
				} catch (e) { console.log(e); }
			}, 100);
		}
		this.selectVendor(0);
	}

	getVendors() {
		return lists.tradeVendoritems;
	}

	selectVendor(index: number) {
		this.vendorIndex = index;
		this.currentPage = 1;
		this.numOfPages = Math.round(lists.tradeVendoritems[index].materials.length / this.limit);
	}

	setValues(): void {
		lists.tradeVendoritems.forEach(v => {
			v.materials.forEach(m => {
				m.value = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].buyout * m.quantity : 0;
				m.buyout = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].buyout : 0;
				if (this.apiToUse !== 'none') {
					m.estDemand = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].estDemand : 0;
					m.regionSaleAvg = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].regionSaleAvg : 0;
					m.mktPrice = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].mktPrice : 0;
					m.avgSold = lists.auctions[m.itemID] !== undefined ? lists.auctions[m.itemID].avgDailySold : 0;
				}
			});
			v.materials.sort(function (a, b) {
				return b.value - a.value;
			});
		});
	}

	sortList() { }
}
