import { Component, OnInit } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { RecipesListComponent } from '../../components/recipes-list/recipes-list.component';
import { API_MOCKS } from '../../utils/mocks/api';
import { type Recipe } from '../../components/create-recipe/recipe.model';
import { ShopListComponent } from '../../components/shop-list/shop-list.component';

@Component({
  selector: 'app-home',
  imports: [LayoutMainComponent, RecipesListComponent, ShopListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  recipesAPI: { [key: string]: Recipe } = {};
  checkedList: { [key: string]: Recipe } = {};

  ngOnInit(): void {
    this.recipesAPI = API_MOCKS.RECIPES_FROM_API;
  }

  onAddIngredientsToList(checkedList: { [key: string]: Recipe }) {
    this.checkedList = { ...checkedList };
  }
}
