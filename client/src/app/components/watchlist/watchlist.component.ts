import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {  } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Angulartics2 } from 'angulartics2';

import { Watchlist, WatchlistItem, WatchlistGroup } from '../../models/watchlist/watchlist';
import { SharedService } from '../../services/shared.service';
import { Recipe } from '../../models/crafting/recipe';
import { Item } from '../../models/item/item';
import { Title } from '@angular/platform-browser';
import { SelectionItem } from '../../models/watchlist/selection-item.model';

@Component({
  selector: 'wah-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements AfterViewInit {
  selectedTabIndex = 2;
  watchlist: Watchlist;

  constructor(private angulartics2: Angulartics2, private _title: Title) {
    this._title.setTitle('WAH - Manage dashboards');


  }

  ngAfterViewInit() {
    if (!SharedService.user.watchlist) {
      SharedService.user.watchlist = new Watchlist();
    }
    this.watchlist = SharedService.user.watchlist;
  }

  tabChange(index: number): void {
    this.selectedTabIndex = index;
  }
}
