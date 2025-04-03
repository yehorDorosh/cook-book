import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { type Ingredient } from '../ingredient-form/ingredient.model';
import { v4 as uuidv4 } from 'uuid';

const INGREDIENTS_FROM_API: {
  [id: string]: Ingredient;
} = {
  '1': { id: '1', name: 'Sugar', value: '100g' },
  '2': { id: '2', name: 'Flour', value: '200g' },
  '3': { id: '3', name: 'Eggs', value: '2' },
}

@Component({
  selector: 'app-create-recipe',
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  @ViewChild('ingredientsFormList', { read: ViewContainerRef, static: true })
  ingredientsFormList!: ViewContainerRef;

  private ingredientRefs: {
    [id: string]: ComponentRef<IngredientFormComponent>;
  } = {};
  ingredientsData: {
    [id: string]: Ingredient;
  } = {};

  ngOnInit(): void {
    for (const key in INGREDIENTS_FROM_API) {
      this.addIngredientForm(INGREDIENTS_FROM_API[key]);
    }
  }

  addIngredientForm(ingredient: Ingredient) {
    const { formRef, uuid} = this.registerIngredient()

    formRef.setInput('ingredient', ingredient);
    this.ingredientsData[uuid] = { ...ingredient, id: uuid };
  }

  addNewIngredientForm() {
    const { formRef, uuid} = this.registerIngredient()

    this.ingredientsData[uuid] = { id: uuid, name: '', value: '' };
  }

  registerIngredient() {
    const uuid = uuidv4();
    const formRef = this.ingredientsFormList.createComponent(
      IngredientFormComponent
    );
    formRef.setInput('id', uuid);

    this.ingredientRefs[uuid] = formRef;

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

    return {
      uuid,
      formRef
    };
  }

  submit(formData: NgForm) {
    console.log(formData.form.value.title);
    console.log(formData.form.value.recipe);

    console.log(this.ingredientsData);
  }
}
