import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { type Ingredient } from '../ingredient-form/ingredient.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-create-recipe',
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  @ViewChild('ingredientsFormList', { read: ViewContainerRef, static: true })
  ingredientsFormList!: ViewContainerRef;

  private ingredientRefs: {
    [id: string]: ComponentRef<IngredientFormComponent>;
  } = {};
  ingredientsData: {
    [key: string]: Ingredient;
  } = {};

  addIngredientForm() {
    const myuuid = uuidv4();
    const formRef = this.ingredientsFormList.createComponent(
      IngredientFormComponent
    );
    formRef.setInput('id', myuuid);

    this.ingredientsData[myuuid] = { id: myuuid, name: '', value: '' };
    this.ingredientRefs[myuuid] = formRef;

    formRef.instance.ingredientInput.subscribe((value: string) => {
      this.ingredientsData[formRef.instance.id].name = value;
    });

    formRef.instance.valueInput.subscribe((value: string) => {
      this.ingredientsData[formRef.instance.id].value = value;
    });

    formRef.instance.deleteBtn.subscribe((id: string) => {
      this.ingredientRefs[id].destroy();
      delete this.ingredientsData[id];
      delete this.ingredientRefs[id];
    });
  }

  submit(formData: NgForm) {
    console.log(formData.form.value.title);
    console.log(formData.form.value.recipe);

    console.log(this.ingredientsData);
  }
}
