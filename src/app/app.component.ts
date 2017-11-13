import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { AuctionService } from './services/auctions.service';
import { CharacterService } from './services/character.service';
import { ItemService } from './services/item.service';
import { user, lists, db, setRecipesForCharacter } from './utils/globals';
import { IUser } from './utils/interfaces';
import { GoldPipe } from './pipes/gold.pipe';
import Push from 'push.js';
import { Notification } from './utils/notification';
import Crafting from './utils/crafting';
import Pets from './utils/pets';
import Auctions from './utils/auctions';
import { Item } from './utils/item';

declare const  ga: Function;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [AuctionService]
})

export class AppComponent implements OnInit {
	// http://realfavicongenerator.net/
	private allItemSources = [];

	constructor(private auctionService: AuctionService,
		private itemService: ItemService, private characterService: CharacterService,
		private router: Router) {
		// Google Analytics
		router.events.subscribe((event: Event) => {
			if (event instanceof NavigationEnd &&
				router.url !== '/' &&
				window.location.hostname !== 'localhost') {
				ga('set', 'page', router.url);
				ga('send', 'pageview');
			}
		});

		try {
			// Just for fun :)
			if (localStorage.getItem('darkMode') !== null && localStorage.getItem('darkMode') === 'false') {
				user.isDarkMode = false;
				document
					.getElementById('custom-style')
					.setAttribute('href', 'assets/paper.bootstrap.min.css');
			} else {
				user.isDarkMode = true;
			}
		} catch (err) {
			console.log('style', err);
		}
	}

	async ngOnInit() {
	}

	attemptDownloadOfMissingRecipes(list): void {
		const recipes = {};
		list.forEach(re => {
			if (re !== null) {
				recipes[re.spellID] = re.spellID;
			}
		});
	}

	getSize(list): number {
		let count = 0;
		for (const c of list) {
			count++;
		}
		return count;
	}

	exists(value): boolean {
		return value !== null && value !== undefined && value.length > 0;
	}

	isRealmSet(): boolean {
		return this.exists(localStorage.getItem('realm')) &&
			this.exists(localStorage.getItem('region'));
	}

	isCharacterSet(): boolean {
		return this.isRealmSet() && this.exists(user.character);
	}

	/**
	 * Used to add item to the list of available contexts for an auction item
	 * @param {[type]} o - Auction item
	 */
	addToContextList(o): void {
		switch (o.context) {
			case 0:
				this.allItemSources[o.context] = 'Drop'
				break;
			case 1:
				this.allItemSources[o.context] = 'World drop'
				break;
			case 2:
				this.allItemSources[o.context] = 'Raid (old)'
				break;
			case 3:
				this.allItemSources[o.context] = 'Normal dungeon';
				break;
			case 4:
				this.allItemSources[o.context] = 'Raid finder';
				break;
			case 5:
				this.allItemSources[o.context] = 'Heroic';
				break;
			case 6:
				this.allItemSources[o.context] = 'Mythic';
				break;
			case 7:
				this.allItemSources[o.context] = 'Player drop';
				break;
			case 9:
				this.allItemSources[o.context] = 'Gathering';
				break;
			case 11:
				this.allItemSources[o.context] = 'Drop';
				break;
			case 13:
				this.allItemSources[o.context] = 'Profession';
				break;
			case 14:
				this.allItemSources[o.context] = 'Vendor';
				break;
			case 15:
				this.allItemSources[o.context] = 'Vendor';
				break;
			case 22:
				this.allItemSources[o.context] = 'Timewalking';
				break;
			case 23:
				this.allItemSources[o.context] = 'Trash drop';
				break;
			case 25:
				this.allItemSources[o.context] = 'World drop';
				break;
			case 26:
				this.allItemSources[o.context] = 'World drop';
				break;
			case 30:
				this.allItemSources[o.context] = 'Mythic dungeon';
				break;
			case 31:
				this.allItemSources[o.context] = 'Garrison mission';
				break;
			default:
				this.allItemSources[o.context] = o.context + ' - ' + o.item + ' - ' + o.name;
				break;
		}
	}
}
