import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recipe } from '../create-recipe/recipe.model';
import { Ingredient, units } from '../ingredient-form/ingredient.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-shop-list',
  imports: [NgFor, NgIf],
  templateUrl: './shop-list.component.html',
  styleUrl: './shop-list.component.scss',
})
export class ShopListComponent implements OnChanges {
  @Input() checkedList: { [key: string]: Recipe } = {};
  shopList: { [key: string]: { ing: Ingredient; checked: boolean } } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['checkedList']) {
      this.shopList = {};
      const recipeList = changes['checkedList'].currentValue as {
        [key: string]: Recipe;
      };

      for (const recipeId in recipeList) {
        const recipe = recipeList[recipeId];

        for (const ingredientId in recipe.ingredients) {
          const ingredient = recipeList[recipeId].ingredients[ingredientId];

          const matchIngredient = Object.values(this.shopList).find(
            (_) => ingredient.name === _.ing.name
          );

          if (
            matchIngredient &&
            matchIngredient.ing.amount.unit === ingredient.amount.unit
          ) {
            matchIngredient.ing.amount.value += ingredient.amount.value;
          } else {
            const newListItem = {
              ing: structuredClone(ingredient),
              checked: false,
            };
            this.shopList[ingredientId] = newListItem;
          }
        }
      }
    }
  }

  get shopListFlat() {
    return Object.values(this.shopList).sort((a, b) => {
      return a.ing.name.localeCompare(b.ing.name);
    });
  }

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.shopList[id].checked = true;
    } else {
      this.shopList[id].checked = false;
    }
  }
}
