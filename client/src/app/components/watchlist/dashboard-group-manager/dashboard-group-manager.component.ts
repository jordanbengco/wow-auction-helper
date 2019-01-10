import {AfterContentInit, Component, Input} from '@angular/core';
import {WatchlistGroup, WatchlistItem} from '../../../models/watchlist/watchlist';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Item} from '../../../models/item/item';
import {SharedService} from '../../../services/shared.service';
import {SelectionItem} from '../../../models/watchlist/selection-item.model';
import {Angulartics2} from 'angulartics2';

@Component({
  selector: 'wah-dashboard-group-manager',
  templateUrl: './dashboard-group-manager.component.html',
  styleUrls: ['./dashboard-group-manager.component.scss']
})
export class DashboardGroupManagerComponent implements AfterContentInit {
  @Input() group: WatchlistGroup;

  itemSelection: Map<string, SelectionItem[]> = new Map<string, SelectionItem[]>();
  tsmGroupStrings: Map<string, string> = new Map<string, string>();
  itemSearchForm: FormControl = new FormControl();
  batchCount = 0;
  shareString;
  filteredItems: Observable<any>;
  selectedItem: WatchlistItem;
  selectedGroup: WatchlistGroup;
  selectedIndex: number;
  selectedBatchAdd: string;
  batchEditMode = false;

  constructor(private angulartics2: Angulartics2) {
    this.filteredItems = this.itemSearchForm.valueChanges
      .pipe(
        startWith(''),
        map(name => this.filter(name))
      );
  }

  ngAfterContentInit(): void {
    this.setTSMGroupString();
    this.setSelectionItems();
  }

  shareGroup(group: WatchlistGroup): void {
    this.shareString = JSON.stringify({groups: [group]});
  }

  openBatchEdit(group: WatchlistGroup): void {
    this.batchEditMode = true;
    this.selectedGroup = group;
  }

  close(): void {
    this.selectedBatchAdd = undefined;
    this.selectedGroup = undefined;
    this.selectedItem = undefined;
    this.selectedIndex = undefined;
    this.batchEditMode = false;

    this.setTSMGroupString();
    this.setSelectionItems();
  }

  batchDelete(group: WatchlistGroup): void {
    for (let i = group.items.length - 1; i >= 0; i--) {
      if (this.itemSelection[group.name][i].isSelected) {
        this.delete(group, group.items[i], i, true);
      }
    }
    this.setSelectionItems();
  }

  clearGroup(group: WatchlistGroup): void {
    group.items.length = 0;
    SharedService.user.watchlist.save();
  }

  save(group): void {
    // group.items = checked;
    SharedService.user.watchlist.save();
  }


  delete(group: WatchlistGroup, watchlistItem: WatchlistItem, index: number, isBatchDeleting?: boolean): void {
    SharedService.user.watchlist.removeItem(group, index);

    this.angulartics2.eventTrack.next({
      action: 'Removed item',
      properties: {category: 'Watchlist'},
    });

    this.setTSMGroupString();
    if (!isBatchDeleting) {
      this.setSelectionItems();
    }
  }

  setTSMGroupString(): void {
    this.tsmGroupStrings.clear();
    SharedService.user.watchlist.groups.forEach(group => {
      // this.tsmGroupStrings.set
      const uniqueItems = new Map<string, number>();
      group.items.forEach(item => {
        uniqueItems[`i:${item.itemID}`] = item.itemID;
      });
      this.tsmGroupStrings[group.name] = Object.keys(uniqueItems).join(',');
    });
  }

  openBachMenu(group: WatchlistGroup): void {
    this.selectedGroup = group;
    this.selectedBatchAdd = group.name;
  }

  add(group: WatchlistGroup, item: Item): void {
    const wlItem = new WatchlistItem(item.id);
    SharedService.user.watchlist.addItem(group, wlItem);
    this.edit(group, wlItem, SharedService.user.watchlist.groups.length - 1);
    this.itemSearchForm.setValue('');

    this.angulartics2.eventTrack.next({
      action: 'Added new item',
      properties: {category: 'Watchlist'},
    });
    this.setSelectionItems();
  }

  edit(group: WatchlistGroup, item: WatchlistItem, index: number): void {
    this.selectedGroup = group;
    this.selectedItem = item;
    this.selectedIndex = index;

    this.angulartics2.eventTrack.next({
      action: 'Edited item',
      properties: {category: 'Watchlist'},
    });
  }

  setSelectionItems(): void {
    this.batchCount = 0;
    this.itemSelection.clear();
    SharedService.user.watchlist.groups.forEach((group: WatchlistGroup) => {
      if (!this.itemSelection[group.name]) {
        this.itemSelection[group.name] = [];
      }
      this.itemSelection[group.name].length = 0;
      group.items.forEach(item =>
        this.itemSelection[group.name].push(new SelectionItem()));
    });
  }

  setCountSelectedItems(evt, selections: SelectionItem[]): void {
    this.batchCount = 0;
    selections.forEach(s => {
      if (s.isSelected) {
        this.batchCount++;
      }
    });
  }

  setSelections(toSelect: boolean, selections: SelectionItem[]): void {
    this.batchCount = 0;
    selections.forEach(s => {
      if (toSelect) {
        this.batchCount++;
      }
      s.isSelected = toSelect;
    });
  }


  /* istanbul ignore next */
  isDarkmode(): boolean {
    return SharedService.user ? SharedService.user.isDarkMode : false;
  }

  /**
   * Such efficient, such ugh
   * @param name Item name for the query
   */
  private filter(name: string): Array<Item> {
    return SharedService.itemsUnmapped.filter(i =>
      i.name.toLowerCase().indexOf(name.toLowerCase()) !== -1).slice(0, 20);
  }
}
