import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { CreateRecipeComponent } from '../../components/create-recipe/create-recipe.component';
import { Ingredient } from '../../components/ingredient-form/ingredient.model';
import { Recipe } from '../../components/create-recipe/recipe.model';

const INGREDIENTS_FROM_API: {
  [id: string]: Ingredient;
} = {
  '1': { id: '1', name: 'Sugar', amount: { value: 2, unit: 'tsp' } },
  '2': { id: '2', name: 'Eggs', amount: { value: 1, unit: 'pcs' } },
  '3': { id: '3', name: 'Milk', amount: { value: 1, unit: 'cup' } },
};

const RECIPES_FROM_API: { [id: string]: Recipe } = {
  '1': {
    id: '1',
    title: 'Food name',
    ingredients: INGREDIENTS_FROM_API,
    steps: [
      { number: 0, title: 'Add sugar', description: 'Add sugar to bowl.' },
      { number: 1, title: 'Add Eggs', description: 'Add raw aggs and Milk' },
    ],
  },
  '2': {
    id: '2',
    title: 'Food name 2',
    ingredients: INGREDIENTS_FROM_API,
    steps: [
      { number: 0, title: 'Add sugar', description: 'Add sugar to bowl.' },
      { number: 1, title: 'Add Eggs', description: 'Add raw aggs and Milk' },
    ],
  },
  '3': {
    id: '3',
    title: 'Food name 3',
    ingredients: INGREDIENTS_FROM_API,
    steps: [
      { number: 0, title: 'Add sugar', description: 'Add sugar to bowl.' },
      { number: 1, title: 'Add Eggs', description: 'Add raw aggs and Milk' },
    ],
  },
};

@Component({
  selector: 'app-new-recipe',
  imports: [LayoutMainComponent, CreateRecipeComponent],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss',
})
export class NewRecipeComponent implements OnInit {
  ingredientsAPI: { [key: string]: Ingredient } = {};
  recipesAPI: { [key: string]: Recipe } = {};

  ngOnInit(): void {
    this.ingredientsAPI = INGREDIENTS_FROM_API;
    this.recipesAPI = RECIPES_FROM_API;
  }
}
