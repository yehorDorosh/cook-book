import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { type Step } from '../create-recipe/recipe.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipe-stepper',
  imports: [FormsModule],
  templateUrl: './recipe-stepper.component.html',
  styleUrl: './recipe-stepper.component.scss',
})
export class RecipeStepperComponent {
  @Input() number: number = 0;
  @Output() onChangeData = new EventEmitter<Step>();
  @Output() deleteBtn = new EventEmitter<number>();
  @Output() addStep = new EventEmitter<number>();

  titleInput = '';
  descriptionInput = '';

  onTitleChange(newValue: string): void {
    this.emitStepData();
  }

  onDescriptionChange(newValue: string): void {
    this.emitStepData();
  }

  private emitStepData(): void {
    this.onChangeData.emit({
      title: this.titleInput,
      description: this.descriptionInput,
      number: this.number,
    });
  }

  onDelete(): void {
    this.deleteBtn.emit(this.number);
  }

  onAddStep() {
    this.addStep.emit(this.number + 1);
  }
}
