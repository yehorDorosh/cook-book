import { Component } from '@angular/core';
import { LayoutMainComponent } from "../../components/layout/layout-main/layout-main.component";
import { CreateRecipeComponent } from "../../components/create-recipe/create-recipe.component";

@Component({
  selector: 'app-new-recipe',
  imports: [LayoutMainComponent, CreateRecipeComponent],
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss'
})
export class NewRecipeComponent {

}
