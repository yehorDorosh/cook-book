import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredient-form',
  imports: [FormsModule],
  templateUrl: './ingredient-form.component.html',
  styleUrl: './ingredient-form.component.scss',
})
export class IngredientFormComponent {
  @Input() id!: string;
  @Output() ingredientInput = new EventEmitter<string>();
  @Output() valueInput = new EventEmitter<string>();
  @Output() deleteBtn = new EventEmitter<string>();

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
