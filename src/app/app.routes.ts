import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';
import { RecipeComponent } from './pages/recipe/recipe.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'new-recipe',
    component: NewRecipeComponent,
  },
  {
    path: 'recipe/:recipeId',
    component: RecipeComponent,
  },
];
