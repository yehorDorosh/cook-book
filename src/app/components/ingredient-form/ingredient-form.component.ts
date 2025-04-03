import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { type Ingredient, type Unit, units } from './ingredient.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-ingredient-form',
  imports: [FormsModule, NgFor],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss',
})
export class IngredientFormComponent implements OnInit {
  @Input() id!: string;
  @Input() ingredient?: Ingredient;
  @Output() ingredientInput = new EventEmitter<string>();
  @Output() valueInput = new EventEmitter<string>();
  @Output() unitSelect = new EventEmitter<Unit>();
  @Output() deleteBtn = new EventEmitter<string>();

  units = units;
  defaultUnit = 'other';

  @ViewChild('ingredietnInputRef', { static: true })
  private ingredietnInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('valueInputRef', { static: true })
  private valueInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('unitSelectRef', { static: true })
  private unitSelectRef!: ElementRef<HTMLSelectElement>;

  ngOnInit(): void {
    if (this.ingredient) {
      this.ingredietnInputRef.nativeElement.value = this.ingredient.name;
      this.valueInputRef.nativeElement.value =
        this.ingredient.amount.value + '';
      this.unitSelectRef.nativeElement.value = this.ingredient.amount.unit;
      this.defaultUnit = this.ingredient.amount.unit;
    }
  }

  onIngredientInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.ingredientInput.emit(target.value);
    }
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
}
