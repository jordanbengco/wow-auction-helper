import { Component, Input } from '@angular/core';
import { Key } from '../../models/sorter.util';

@Component({
  selector: 'wah-sort-icon',
  templateUrl: './sort-icon.component.html'
})
export class SortIconComponent {
  @Input() key: Key;
}
