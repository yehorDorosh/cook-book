import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Unit, type Ingredient } from '../ingredient-form/ingredient.model';
import { v4 as uuidv4 } from 'uuid';
import { RecipeStepperComponent } from '../recipe-stepper/recipe-stepper.component';
import { Step } from './recipe.model';

const INGREDIENTS_FROM_API: {
  [id: string]: Ingredient;
} = {
  '1': { id: '1', name: 'Sugar', amount: { value: 2, unit: 'tsp' } },
  '2': { id: '2', name: 'Eggs', amount: { value: 1, unit: 'pcs' } },
  '3': { id: '3', name: 'Milk', amount: { value: 1, unit: 'cup' } },
};

@Component({
  selector: 'app-create-recipe',
  imports: [FormsModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  @ViewChild('ingredientsFormList', { read: ViewContainerRef, static: true })
  ingredientsFormList!: ViewContainerRef;

  @ViewChild('stepper', { read: ViewContainerRef, static: true })
  stepper!: ViewContainerRef;

  private ingredientRefs: {
    [id: string]: ComponentRef<IngredientFormComponent>;
  } = {};
  private ingredientsData: {
    [id: string]: Ingredient;
  } = {};

  private stepsRefs: (ComponentRef<RecipeStepperComponent> | undefined)[] = [];
  private stepsData: (Step | undefined)[] = [];

  ngOnInit(): void {
    for (const key in INGREDIENTS_FROM_API) {
      this.addIngredientForm(INGREDIENTS_FROM_API[key]);
    }
  }

  addIngredientForm(ingredient: Ingredient) {
    const { formRef, uuid } = this.registerIngredient();

    formRef.setInput('ingredient', ingredient);
    this.ingredientsData[uuid] = { ...ingredient, id: uuid };
  }

  addNewIngredientForm() {
    const { formRef, uuid } = this.registerIngredient();

    this.ingredientsData[uuid] = {
      id: uuid,
      name: '',
      amount: { value: 0, unit: 'other' },
    };
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
      this.ingredientsData[formRef.instance.id].amount.value = +value;
    });

    formRef.instance.unitSelect.subscribe((value: Unit) => {
      this.ingredientsData[formRef.instance.id].amount.unit = value;
    });

    formRef.instance.deleteBtn.subscribe((id: string) => {
      this.ingredientRefs[id].destroy();
      delete this.ingredientsData[id];
      delete this.ingredientRefs[id];
    });

    return {
      uuid,
      formRef,
    };
  }

  addNewStep() {
    this.registerStep();
  }

  registerStep(number?: number) {
    const lastFreeIndex = number ?? this.stepsRefs.length;
    const stepRef = this.stepper.createComponent(RecipeStepperComponent);
    // Insert the new component at the desired index
    if (number) this.stepper.insert(stepRef.hostView, number);
    stepRef.setInput('number', lastFreeIndex);

    this.stepsRefs[lastFreeIndex] = stepRef;

    stepRef.instance.onChangeData.subscribe((step: Step) => {
      this.stepsData[step.number] = step;
    });

    stepRef.instance.addStep.subscribe((newNumber: number) => {
      if (this.stepsRefs[newNumber]) {
        this.stepsRefs.splice(newNumber, 0, undefined);
        this.stepsData.splice(newNumber, 0, undefined);
        this.registerStep(newNumber);

        for (let i = newNumber + 1; i < this.stepsRefs.length; i++) {
          this.stepsRefs[i]?.setInput('number', i);
          if (typeof this.stepsData[i] === 'object')
            this.stepsData[i]!.number = i;
        }
      } else {
        this.registerStep(newNumber);
      }
    });

    stepRef.instance.deleteBtn.subscribe((number: number) => {
      this.stepsRefs[number]?.destroy();
      this.stepsData.splice(number, 1);
      this.stepsRefs.splice(number, 1);

      this.stepsRefs.forEach((stepRef, i) => {
        stepRef?.setInput('number', i);
        if (this.stepsData[i]) this.stepsData[i].number = i;
      });
    });

    return {
      lastFreeIndex,
      stepRef,
    };
  }

  submit(formData: NgForm) {
    console.log(formData.form.value.title);

    console.log(this.ingredientsData);
    console.log(this.stepsData);
  }
}
