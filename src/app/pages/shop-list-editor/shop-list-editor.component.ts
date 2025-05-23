import { Component } from '@angular/core';
import { LayoutMainComponent } from '../../components/layout/layout-main/layout-main.component';
import { IngredientFormComponent } from '../../components/ingredient-form/ingredient-form.component';
import { CustomShopItemsComponent } from '../../components/custom-shop-items/custom-shop-items.component';

@Component({
  selector: 'app-shop-list-editor',
  imports: [
    LayoutMainComponent,
    IngredientFormComponent,
    CustomShopItemsComponent,
  ],
  templateUrl: './shop-list-editor.component.html',
  styleUrl: './shop-list-editor.component.scss',
})
export class ShopListEditorComponent {}
