import { Recipe } from '../components/create-recipe/recipe.model';
import { API_MOCKS } from './mocks/api';

class API {
  private static instance: API;

  private constructor() {}

  static getInstance(): API {
    if (!API.instance) {
      API.instance = new API();
    }
    return API.instance;
  }

  saveRecipe(id: string, recipe: Recipe, cb?: () => void) {
    API_MOCKS.RECIPES_FROM_API[id] = recipe;

    if (cb) cb();
  }
}

const api = API.getInstance();

export default api;
