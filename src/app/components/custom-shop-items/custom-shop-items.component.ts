import { Component } from '@angular/core';
import { IngredientService } from '../../services/ingredient.service';
import { NgFor } from '@angular/common';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-custom-shop-items',
  imports: [NgFor, IngredientFormComponent],
  templateUrl: './custom-shop-items.component.html',
  styleUrl: './custom-shop-items.component.scss',
})
export class CustomShopItemsComponent {
  constructor(private ingredientService: IngredientService) {}

  get customIngredientList() {
    if (this.ingredientService.customIngredients) {
      return Object.values(this.ingredientService.customIngredients);
    } else {
      return [];
    }
  }

  onDelete(id: string) {
    this.ingredientService.deleteCustomIngredient(id);
  }
}
