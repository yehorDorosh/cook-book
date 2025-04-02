import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { type Ingredient } from '../ingredient-form/ingredient.model';

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
    id: number;
    ref: ComponentRef<IngredientFormComponent>;
  }[] = [];
  ingredientsData: Ingredient[] = [];
  private counter: number = 0;

  addIngredientForm() {
    const formRef = this.ingredientsFormList.createComponent(
      IngredientFormComponent
    );
    formRef.setInput('id', this.counter);

    this.ingredientsData[this.counter] = { ingredient: '', value: '' };
    this.ingredientRefs.push({ id: this.counter, ref: formRef });

    formRef.instance.ingredientInput.subscribe((value: string) => {
      this.ingredientsData[formRef.instance.id].ingredient = value;
    });

    formRef.instance.valueInput.subscribe((value: string) => {
      this.ingredientsData[formRef.instance.id].value = value;
    });

    formRef.instance.deleteBtn.subscribe((id: number) => {
      // ✅ Находим индекс компонента в массиве
      const index = this.ingredientRefs.findIndex((ref) => ref.id === id);

      if (index !== -1) {
        // Удаляем компонент из `ViewContainerRef`
        this.ingredientRefs[index].ref.destroy();

        // Удаляем данные ингредиента
        this.ingredientsData.splice(id, 1);

        // Удаляем ссылку из массива
        this.ingredientRefs.splice(index, 1);
      }
    });

    this.counter++;
  }

  submit(formData: NgForm) {
    console.log(formData.form.value.title);
    console.log(formData.form.value.recipe);

    console.log(this.ingredientsData);
  }
}
