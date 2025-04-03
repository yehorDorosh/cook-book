export interface Ingredient {
  id: string;
  name: string;
  amount: {
    value: number;
    unit: Unit;
  };
}

export type Unit = 'pcs' | Mass | Volume | 'other';

type Mass = 'g' | 'kg';

type Volume = 'ml' | 'L' | 'tsp' | 'tbsp' | 'cup' | 'pinch';

export const units: Unit[] = [
  'pcs',
  'g',
  'kg',
  'ml',
  'L',
  'tsp',
  'tbsp',
  'cup',
  'pinch',
  'other',
];
