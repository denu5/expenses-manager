export const API = {
  BASE: process.env.REACT_APP_API_BASE,
  EXPENSES: '/expenses'
};

function arrayFromEnv(arr: string | undefined): string[] {
  if (!arr) {
    return [];
  }
  return arr.split(',');
}

export const CURRENCIES: string[] = arrayFromEnv(
  process.env.REACT_APP_CURRENCIES
);

export const DEFAULT_CURRENCY = process.env.REACT_APP_DEFAULT_CURRENCY;

export const CATEGORIES: string[] = arrayFromEnv(
  process.env.REACT_APP_CATEGORIES
);

const CATEGORIES_COLORS = arrayFromEnv(process.env.REACT_APP_CATEGORY_COLORS);

export const getCategoryColor = (category: string): string => {
  return CATEGORIES_COLORS[CATEGORIES.indexOf(category)];
};

export const DEFAULT_CATEGORY = process.env.REACT_APP_DEFAULT_CATEGORY;

export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'HH:mm';
export const UNIX_FORMAT = 'X';
