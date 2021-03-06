import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SharedService} from './shared.service';
import {Recipe} from '../models/crafting/recipe';
import {Endpoints} from './endpoints';
import {ItemService} from './item.service';
import {GameBuild} from '../utils/game-build.util';
import {Item} from '../models/item/item';
import {DatabaseService} from './database.service';
import {ErrorReport} from '../utils/error-report.util';
import {Angulartics2} from 'angulartics2';
import {Platform} from '@angular/cdk/platform';

class RecipeResponse {
  timestamp: Date;
  recipes: Recipe[];
}

@Injectable()
export class CraftingService {
  readonly LOCAL_STORAGE_TIMESTAMP = 'timestamp_recipes';

  constructor(private _http: HttpClient,
              private _itemService: ItemService,
              private dbService: DatabaseService,
              private angulartics2: Angulartics2,
              public platform: Platform) {
  }

  getRecipe(spellID: number): Promise<Recipe> {
    return this._http.post(
      Endpoints.getLambdaUrl(`recipe/${spellID}`), {
        locale: localStorage['locale']
      })
      .toPromise()
      .then(r =>
        this.handleRecipe(r as Recipe))
      .catch(error => {
        console.error(`Could not get recipe ${spellID}`, error);
        ErrorReport.sendHttpError(error);
        return error;
      });
  }

  async getRecipes(): Promise<any> {
    const locale = localStorage['locale'];
    let timestamp = localStorage[this.LOCAL_STORAGE_TIMESTAMP];
    console.log('Downloading recipes');
    SharedService.downloading.recipes = true;

    if (!timestamp) {
      this.dbService.clearRecipes();
      await this._http.get(`https://s3-eu-west-1.amazonaws.com/wah-data/recipes-${locale}.json.gz`)
        .toPromise()
        .then((result: RecipeResponse) => {
          timestamp = result.timestamp;
          SharedService.recipes.length = 0;
          this.handleRecipes(result);
        })
        .catch(error =>
          ErrorReport.sendHttpError(error));
    }

    SharedService.downloading.recipes = true;
    return this._http.post(
      Endpoints.getLambdaUrl(`recipe`),
      {
        locales: locale,
        timestamp: timestamp ? timestamp : new Date('2000-06-30').toJSON()
      })
      .toPromise()
      .then((recipes: RecipeResponse) =>
        this.handleRecipes(recipes))
      .catch(error => {
        SharedService.downloading.recipes = false;
        console.error('Recipe download failed', error);
        ErrorReport.sendHttpError(error);
      });
  }

  updateRecipe(spellID: number): Promise<Recipe> {
    return this._http.patch(Endpoints.getLambdaUrl(`recipe/${spellID}`), {
      locale: localStorage['locale']
    })
      .toPromise() as Promise<Recipe>;
  }

  async handleRecipe(r: Recipe, missingItems?: Array<number>): Promise<Recipe> {
    const possiblyBuggedRecipe = !r.profession && r.name.indexOf('Create ') !== -1;
    if (missingItems && r.itemID > 0 && !SharedService.items[r.itemID]) {
      missingItems.push(r.itemID);
    }

    r.reagents.forEach(async reagent => {
      if (reagent.itemID > 0 && !SharedService.items[reagent.itemID]) {
        ItemService.missingQueue[reagent.itemID] = reagent.itemID;
      }
    });

    if (possiblyBuggedRecipe) {
      r.flaggedAsBugged = true;
    }

    SharedService.recipesMap[r.spellID] = r;
    return r;
  }

  handleRecipes(recipes: RecipeResponse): void {
    const missingItems = [], map = new Map<number, Recipe>(),
      noRecipes = SharedService.recipes.length === 0;
    SharedService.downloading.recipes = false;

    if (recipes.recipes.length > 0) {
      const list = SharedService.recipes.concat(recipes.recipes);
      SharedService.recipes = [];
      list.forEach((recipe: Recipe) => {
        if (!recipe) {
          return;
        }

        if (recipe.name.indexOf('Pact of Versatility') > -1) {
          console.log(recipe.name, recipe.rank, recipe.reagents[0].count);
        }

        if (map[recipe.spellID]) {
          Object.keys(recipe).forEach(key => {
            map[recipe.spellID][key] = recipe[key];
          });
        } else {
          map[recipe.spellID] = recipe;
          SharedService.recipes.push(recipe);
        }
      });
      console.log('List length', list.length, SharedService.recipes.length, Object.keys(map).length);
    }
    console.log('Recipe download is completed');

    // Adding items if there are any missing
    try {
      SharedService.recipes.forEach(r => {
        this.handleRecipe(r, missingItems);
      });

      if (missingItems.length < 100) {
        this._itemService.addItems(missingItems);
      }

      if (!this.platform.WEBKIT) {
        this.dbService.addRecipes(SharedService.recipes);
        localStorage[this.LOCAL_STORAGE_TIMESTAMP] = recipes.timestamp;
      }
    } catch (error) {
      console.error(error);
    }
    SharedService.events.recipes.emit(true);
    console.log('List length', SharedService.recipes.length);
  }

  /**
   * Throtteled adding of missing items
   *
   * @param {Array<number>} recipesToAdd A list of item id's that needs to be added
   * @param {number} [i] the next index to add
   * @returns {void}
   * @memberof ItemService
   */
  addRecipes(recipesToAdd: Array<number>, i?: number): void {
    if (!i) {
      i = 0;
    }

    if (recipesToAdd.length === 0) {
      return;
    }

    setTimeout(() => {
      if (recipesToAdd[i]) {
        SharedService.recipesMap[i] = new Recipe();
        this.getRecipe(recipesToAdd[i]);
      }

      i++;
      if (i === recipesToAdd.length) {
        console.log(`Done adding ${i} recipes`);
        return;
      } else {
        this.addRecipes(recipesToAdd, i);
      }
    }, 1000);
  }
}
