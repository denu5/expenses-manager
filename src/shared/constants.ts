export const API = {
  BASE: '//localhost:4000',
  EXPENSES: '/expenses',
  CURRENCIES: '/currencies',
  EXCHANGERATES: '/exchange-rates'
};

export const CURRENCIES: string[] = ['CHF', 'EUR', 'USD', 'PLN'];

export const DEFAULT_CURRENCY = CURRENCIES[0];

export const EXPENSE_CATEGORIES: string[] = [
  'FOOD',
  'DRINKS',
  'TRANSPORT',
  'SHOPPING',
  'OTHER'
];

export const DEFAULT_EXPENSE_TYPES = EXPENSE_CATEGORIES[0];

export const dateFormat = 'DD-MM-YYYY';
export const timeFormat = 'HH:mm';
export const unixTimeFormat = 'X';
