import { ItemSpells } from 'app/models/itemspells';

export class ItemDTO {
    id: string;
    name: string;
    icon: string;
    itemLevel: number;
    itemClass: string;
    itemSubClass: string;
    quality: number;
    itemSpells: ItemSpells[];
    buyPrice: number;
    sellPrice: number;
    itemBind: number;
    minFactionId: string;
    minReputation: number;
    isDropped: boolean;
}
