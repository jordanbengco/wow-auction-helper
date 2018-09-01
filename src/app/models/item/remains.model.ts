import { Item } from './item';
import { WoWHeadProspectedFrom } from './wowhead';

export class Remains {
  id: number;
  name: string;
  outOf: number;
  entries?: Remains[] = [];
  buyout?: number;
  yield?: number;
  sources: RemainsSource[] = [];

  constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
  }

  public static updateSourcesDropChance(remains: Remains): void {
    remains.sources.forEach(source =>
      RemainsSource.setDropChance(remains, source));
  }

  public static addSource(item: Item, remains: Remains): void {
    remains.sources.push(new RemainsSource(item, 1, 2));
  }

  public static sumUp(remains: Remains): void {
    const map = new Map<number, RemainsSource>();
    remains.sources.forEach((source: RemainsSource) =>
      map[source.id] = source);
    remains.entries.forEach((entry) => {
      remains.outOf += entry.outOf;
      entry.sources.forEach(source =>
        map[source.id].count += source.count);
    });
  }
}

export class RemainsEntry {
  id: number;
  outOf = 0;
  sources: RemainsSourceEntry[] = [];
  timestamp = new Date();

  constructor(remains: Remains) {
    this.id = remains.id;
    remains.sources.forEach(source => {
      this.sources.push(new RemainsSourceEntry(source));
    });
  }

  canSave(): boolean {
    return this.outOf > 0;
  }
}

export class RemainsSourceEntry {
  id: number;
  count = 0;

  constructor(source: RemainsSource) {
    this.id = source.id;
  }
}

export class RemainsSource {
  id: number;
  name: string;
  count: number;
  cost: number;
  value?: number;
  dropChance: number;

  constructor(item: Item, count: number, outOf: number) {
    this.id = item.id;
    this.name = item.name;
    this.count = count;
  }

  public static update(count: number, remains: Remains, source: RemainsSource): void {
    source.count += count;
    RemainsSource.setDropChance(remains, source);
  }

  public static setDropChance(remains: Remains, source: RemainsSource): void {
    source.dropChance = source.count / remains.outOf;
  }
}
