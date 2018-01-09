import { Recipe } from './crafting/recipe';
import { Reagent } from './crafting/reagent';
import { AuctionItem } from './auction/auction-item';
import { Item } from './item/item';
import { SharedService } from '../services/shared.service';

/**
 * Local storage value: shopping_cart
 */
export class ShoppingCart {
  recipes: Array<ShoppingCartRecipe> = new Array<ShoppingCartRecipe>();
  recipesMap: Map<number, ShoppingCartRecipe> = new Map<number, ShoppingCartRecipe>();
  reagents: Array<ShoppingCartReagent> = new Array<ShoppingCartReagent>();
  reagentsMap: Map<number, ShoppingCartReagent> = new Map<number, ShoppingCartReagent>();
  items: Array<ShoppingCartItem> = new Array<ShoppingCartItem>();
  itemsMap: Map<number, ShoppingCartItem> = new Map<number, ShoppingCartItem>();

  cost: 0;
  buyout: 0;
  profit: 0;

  // TODO: Add shopping cart cost calc strategies

  addEntry(quantity: number, recipe?: Recipe, item?: AuctionItem, asSubmat?: boolean): void {
    // If sub material, re-run this function for that recipe instead!
    // Already exists?
      // > Add +1 to the recipe
      // > Add the requiered reagents

    // If not, lets add it

    for (let i = 0; i < quantity; i++) {
      if (recipe) {
        if (this.recipesMap[recipe.spellID]) {
          this.recipesMap[recipe.spellID].quantity++;
          recipe.reagents.forEach(r => {
            if (this.reagentsMap[r.itemID]) {
              if (this.useIntermediateCrafting() && this.getRecipeForItem(r.itemID)) {
                const iC = SharedService.recipesMapPerItemKnown[r.itemID];
                this.addEntry(r.count / iC.minCount, iC, undefined, true);
              } else {
                this.reagentsMap[r.itemID].quantity += r.count;
              }
            } else {
              this.reagentsMap[r.itemID] = new ShoppingCartReagent(r.itemID, r.count);
              this.reagents.push(this.reagentsMap[r.itemID]);
            }
          });
        } else {
          this.recipesMap[recipe.spellID] = new ShoppingCartRecipe(recipe.spellID, recipe.itemID);
          this.recipes.push(this.recipesMap[recipe.spellID]);
          console.log(JSON.stringify(recipe));
          recipe.reagents.forEach(r => {
            if (this.useIntermediateCrafting() && this.getRecipeForItem(r.itemID)) {
              const iC = SharedService.recipesMapPerItemKnown[r.itemID];
              this.addEntry(r.count / iC.minCount, iC, undefined, true);
            } else {
              this.addReagent(r.itemID, r.count / recipe.minCount, recipe);
            }
          });
        }
      } else if (item) {
        if (this.itemsMap[item.itemID]) {
          this.itemsMap[item.itemID].quantity++;
        } else {
          this.itemsMap[item.itemID] = new ShoppingCartItem(item.itemID);
        }
      }
    }
    if (!asSubmat) {
      this.calculateCartCost();
      this.save();
    }
  }

  addReagent(itemID: number, count: number, recipe: Recipe): void {
    if (this.reagentsMap[itemID]) {
      this.reagentsMap[itemID].quantity += count;
    } else {
      this.reagentsMap[itemID] = new ShoppingCartReagent(itemID, count);
      this.reagents.push(this.reagentsMap[itemID]);
    }
    this.recipesMap[recipe.spellID]
      .reagents.push(new ShoppingCartReagent(itemID, count));
  }

  getRecipeForItem(itemID: number): boolean {
    return SharedService.recipesMapPerItemKnown[itemID] && SharedService.auctionItemsMap[itemID] &&
      SharedService.recipesMapPerItemKnown[itemID].cost < SharedService.auctionItemsMap[itemID].buyout;
  }

  calculateCartCost(): void {
    this.buyout = 0;
    this.cost = 0;
    this.profit = 0;

    if (SharedService.recipes.length === 0 || SharedService.auctionItems.length === 0) {
      return;
    }

    this.recipes.forEach(recipe => {
      const r = SharedService.recipesMap[recipe.spellID];
      this.buyout += r.buyout * recipe.quantity;
      this.cost += r.cost * recipe.quantity;
      this.profit += r.roi * recipe.quantity;
    });
  }


  restore(): void {

    let lsObject;
    if (localStorage['shopping_cart']) {
      lsObject = JSON.parse(localStorage['shopping_cart']);
      if (!lsObject) {
        return;
      }

      if (lsObject.cost) {
        delete localStorage['shopping_cart'];
      } else {
        if (lsObject.reagents) {
          this.reagents = lsObject.reagents;
          this.reagents.forEach(r => {
            this.reagentsMap[r.itemID] = r;
          });
        }

        if (lsObject.recipes) {
          this.recipes = lsObject.recipes;
          this.recipes.forEach(r => {
            this.recipesMap[r.spellID] = r;
          });
        }

        if (lsObject.items) {
          this.items = lsObject.items;
          this.items.forEach(i => {
            this.itemsMap[i.itemID] = i;
          });
        }

        this.calculateCartCost();
      }
    }
  }

  clear(): void {
    this.recipes = new Array<ShoppingCartRecipe>();
    this.recipesMap = new Map<number, ShoppingCartRecipe>();
    this.reagents = new Array<ShoppingCartReagent>();
    this.reagentsMap = new Map<number, ShoppingCartReagent>();
    this.items = new Array<ShoppingCartItem>();
    this.itemsMap = new Map<number, ShoppingCartItem>();
    this.save();
  }

  save(): void {
    localStorage['shopping_cart'] =
      JSON.stringify({ recipes: this.recipes, reagents: this.reagents, items: this.items });
  }

  removeRecipe(recipe: ShoppingCartRecipe, index: number): void {
    console.log('Not really deleting');
  }

  useIntermediateCrafting(): boolean {
    return SharedService.user && SharedService.user.useIntermediateCrafting;
  }
}

export class ShoppingCartRecipe {
  spellID: number;
  itemID: number;
  quantity: number;
  reagents: Array<ShoppingCartReagent> = Array<ShoppingCartReagent>();

  constructor(spellID: number, itemID: number) {
    this.spellID = spellID;
    this.itemID = itemID;
    this.quantity = 1;
  }
}

export class ShoppingCartReagent {
  itemID: number;
  quantity: number;

  constructor(itemID: number, quantity: number) {
    this.itemID = itemID;
    this.quantity = quantity;
  }
}

export class ShoppingCartItem {
  itemID: number;
  quantity = 1;

  constructor(itemID: number) {
    this.itemID = itemID;
  }
}
