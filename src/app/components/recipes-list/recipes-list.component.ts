import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Recipe } from '../create-recipe/recipe.model';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss',
})
export class RecipesListComponent implements OnChanges {
  @Input() list: { [key: string]: Recipe } = {};
  @Output() onAddIngredientsToList = new EventEmitter<{
    [key: string]: Recipe;
  }>();

  recipesFlat: Recipe[] = [];
  checkedList: {
    [key: string]: Recipe;
  } = {};

  ngOnChanges(changes: SimpleChanges): void {
    this.recipesFlat = Object.values(changes['list'].currentValue);
  }

  onCheck(event: Event, id: string) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.checkedList[id] = this.list[id];
    } else {
      delete this.checkedList[id];
    }

    this.onAddIngredientsToList.emit(this.checkedList);
  }
}
