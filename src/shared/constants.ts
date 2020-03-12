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

const EXPENSE_CATEGORIES_COLORS = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

export const getCategoryColor = (category: string): string => {
  return (
    EXPENSE_CATEGORIES_COLORS[EXPENSE_CATEGORIES.indexOf(category)] || '#CCCCCC'
  );
};

export const DEFAULT_EXPENSE_TYPES = EXPENSE_CATEGORIES[0];

export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const UNIX_FORMAT = 'X';
