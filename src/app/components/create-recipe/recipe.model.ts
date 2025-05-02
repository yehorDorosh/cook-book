import { Ingredient } from '../ingredient-form/ingredient.model';

export interface Recipe {
  id?: string;
  title: string;
  ingredients: { [key: string]: Ingredient };
  steps: Step[];
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface RecipeResponse {
  [id: string]: Recipe;
}
