import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { API_MOCKS } from '../../utils/mocks/api';
import { type Recipe } from '../../components/create-recipe/recipe.model';
import { ShopListComponent } from '../../components/shop-list/shop-list.component';
import { LoginFormComponent } from '../../components/auth/login-form/login-form.component';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-home',
  imports: [
    LayoutMainComponent,
    RecipesListComponent,
    ShopListComponent,
    LoginFormComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  checkedList: { [key: string]: Recipe } = {};

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {}

  onAddIngredientsToList(checkedList: { [key: string]: Recipe }) {
    this.checkedList = { ...checkedList };
  }

  get recipes() {
    return this.recipeService.recipes || {};
  }
}
