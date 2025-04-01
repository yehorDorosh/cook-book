import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';

export const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'new-recipe',
      component: NewRecipeComponent,
    },
];
