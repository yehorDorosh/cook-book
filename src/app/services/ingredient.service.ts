import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import db from '../utils/firebase/db-firebase';
import { Endpoints } from '../utils/firebase/api.model';
import {
  Ingredient,
  IngredientsResponse,
} from '../components/ingredient-form/ingredient.model';
import { isAppError } from '../utils/errors.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  customIngredients: IngredientsResponse | null = null;

  constructor(private userService: UserService) {
    this.userService.onUserUpd.subscribe((user) => {
      this.getCustomIngredient();
    });
  }

  async getCustomIngredient() {
    if (!this.userService.user) return null;

    const response = await db.getData<IngredientsResponse>(
      Endpoints.ingredients
    );

    if (!isAppError(response)) {
      this.customIngredients = response;
      return response;
    }

    return null;
  }

  saveCustomIngredient(ingredient: Ingredient, id: string, cb?: () => void) {
    if (!this.userService.user) return;

    db.sendData(Endpoints.ingredients, ingredient, id, () => {
      this.getCustomIngredient();
    });

    if (cb) {
      cb();
    }
  }

  deleteCustomIngredient(id: string, cb?: () => void) {
    db.deleteData(Endpoints.ingredients, id, () => {
      this.getCustomIngredient();
    });

    if (cb) {
      cb();
    }
  }
}
