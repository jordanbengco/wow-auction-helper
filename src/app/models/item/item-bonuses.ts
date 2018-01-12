import { SharedService } from '../../services/shared.service';

export class ItemBonus {
    bonusID: number;
    name: string;
    bonusILvL: number;

    constructor(bonusID: number, name: string, bonusILvL: number) {
      this.bonusID = bonusID;
      this.name = name;
      this.bonusILvL = bonusILvL;
    }

    public static init(): void {
      // Dungeon
      SharedService.bonusIDMap[1826] = new ItemBonus(1826, 'Normal dungeon', 0);
      SharedService.bonusIDMap[1726] = new ItemBonus(1726, 'Heroic dungeon', 10);
      SharedService.bonusIDMap[1727] = new ItemBonus(1727, 'Mythic dungeon', 40);

      // Raid
      SharedService.bonusIDMap[3613] = new ItemBonus(3613, 'LFR', -15);
      SharedService.bonusIDMap[3610] = new ItemBonus(3610, 'Normal raid', 0);
      SharedService.bonusIDMap[3611] = new ItemBonus(3611, 'Heroic raid', 15);
      SharedService.bonusIDMap[3612] = new ItemBonus(3612, 'Heroic raid', 30);

      // Other
      SharedService.bonusIDMap[3336] = new ItemBonus(3336, 'Warforged', 5);
      SharedService.bonusIDMap[3337] = new ItemBonus(3337, 'Titanforged', 30);
    }
}
