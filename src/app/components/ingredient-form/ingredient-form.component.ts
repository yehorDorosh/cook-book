import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-ingredient-form',
  imports: [FormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss',
})
export class IngredientFormComponent implements OnInit {
  @Input() id!: string;
  @Input() ingredient?: Ingredient;
  @Output() ingredientInput = new EventEmitter<string>();
  @Output() valueInput = new EventEmitter<string>();
  @Output() deleteBtn = new EventEmitter<string>();

  @ViewChild('ingredietnInputRef', {static: true}) private ingredietnInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('valueInputRef', {static: true}) private valueInputRef!: ElementRef<HTMLInputElement>;


  ngOnInit(): void {
    if (this.ingredient) {
      this.ingredietnInputRef.nativeElement.value = this.ingredient.name;
      this.valueInputRef.nativeElement.value = this.ingredient.value;
    }
  }

  onIngredientInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.ingredientInput.emit(target.value)
    }
  }

  onValueInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.valueInput.emit(target.value)
    }
  }

  onDelete(event: Event) {
    this.deleteBtn.emit(this.id)
  }
}
