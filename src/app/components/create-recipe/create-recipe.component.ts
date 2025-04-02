import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { type Ingredient } from '../ingredient-form/ingredient.model';

@Component({
  selector: 'app-create-recipe',
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
  @ViewChild('ingredientsFormList', { read: ViewContainerRef, static: true })
  ingredientsFormList!: ViewContainerRef;
  ingredientsData: Ingredient[] = [];
  private counter: number = 0

  addIngredientForm() {
   const formRef = this.ingredientsFormList.createComponent(IngredientFormComponent)
   formRef.setInput('id', this.counter)

   this.ingredientsData[this.counter] = { ingredient: '', value: '' };

   formRef.instance.ingredientInput.subscribe((value: string) => {
    this.ingredientsData[formRef.instance.id].ingredient = value
   })

   formRef.instance.valueInput.subscribe((value: string) => {
    this.ingredientsData[formRef.instance.id].value = value
   })

   this.counter++;
  }

  submit(formData: NgForm) {
    console.log(formData.form.value.title)
    console.log(formData.form.value.recipe)

    console.log(this.ingredientsData)
  }
}
