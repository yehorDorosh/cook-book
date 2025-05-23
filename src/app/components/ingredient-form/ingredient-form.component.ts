import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Ingredient, type Unit, units } from './ingredient.model';
import { NgFor, NgIf } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { UserService } from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { IngredientService } from '../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss',
})
export class IngredientFormComponent implements AfterViewInit {
  @Input() id: string = '';
  @Input() ingredient?: Ingredient;
  @Input() isCustomIngredient?: boolean = false;
  @Output() ingredientInput = new EventEmitter<string>();
  @Output() valueInput = new EventEmitter<string>();
  @Output() unitSelect = new EventEmitter<Unit>();
  @Output() deleteBtn = new EventEmitter<string>();

  units = units;
  defaultUnit = 'other';
  matchedIngredients: Ingredient[] | null = null;
  isLoading = false;

  @ViewChild('ingredietnInputRef', { static: false })
  private ingredietnInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('valueInputRef', { static: false })
  private valueInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('unitSelectRef', { static: false })
  private unitSelectRef!: ElementRef<HTMLSelectElement>;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private ingredientService: IngredientService
  ) {}

  ngAfterViewInit(): void {
    if (this.ingredient) {
      this.ingredietnInputRef.nativeElement.value = this.ingredient.name;
      this.valueInputRef.nativeElement.value =
        this.ingredient.amount.value + '';
      this.unitSelectRef.nativeElement.value = this.ingredient.amount.unit;
      // this.defaultUnit = this.ingredient.amount.unit;
    }
  }

  onIngredientInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.ingredientInput.emit(target.value);
      this.matchedIngredients = this.matchIngredient(target.value);
    }
  }

  matchIngredient(input: string) {
    const ingredientsGlobal = this.recipeService.ingredientsGlobal;
    if (!ingredientsGlobal) return null;

    const ingredientList = Object.values(ingredientsGlobal);

    const filtered = ingredientList.filter((ingredient) => {
      const regex = new RegExp(`^${input}`, 'i');
      return regex.test(ingredient.name);
    });

    if (filtered.length) return filtered;
    else return null;
  }

  onValueInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.valueInput.emit(target.value);
    }
  }

  onUnitSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target) {
      this.unitSelect.emit(target.value as Unit);
    }
  }

  onDelete(event: Event) {
    this.deleteBtn.emit(this.id);
  }

  onSubmit() {
    const ingredientName = this.ingredietnInputRef.nativeElement.value;
    const ingredientValue = this.valueInputRef.nativeElement.value;
    const ingredientUnit = this.unitSelectRef.nativeElement.value as Unit;

    if (ingredientName && ingredientValue && ingredientUnit) {
      const newIngredient: Ingredient = {
        id: this.id || uuidv4(),
        name: ingredientName,
        amount: {
          value: +ingredientValue,
          unit: ingredientUnit,
        },
      };

      this.isLoading = true;

      this.ingredientService.saveCustomIngredient(
        newIngredient,
        newIngredient.id,
        () => {
          this.isLoading = false;
          if (!this.id) {
            this.ingredietnInputRef.nativeElement.value = '';
            this.valueInputRef.nativeElement.value = '';
            this.unitSelectRef.nativeElement.value = 'other';
          }
        }
      );
    }
  }

  get isLoggedIn() {
    return !!this.userService.user;
  }
}
