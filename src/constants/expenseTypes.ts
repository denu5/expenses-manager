export type ExpenseCategory =
  | 'FOOD'
  | 'DRINKS'
  | 'TRANSPORT'
  | 'SHOPPING'
  | 'OTHER';

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  'FOOD',
  'DRINKS',
  'TRANSPORT',
  'SHOPPING',
  'OTHER'
];

export const DEFAULT_EXPENSE_TYPES = EXPENSE_CATEGORIES[0];
