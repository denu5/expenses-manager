import axios from 'axios';
import { Expense } from '../model/expenses';

import { Currency } from '../constants/currencies';

const apiUrl = `//localhost:4000/expenses`;

interface GetExpensesParams {
  _sort: string;
  _order: 'asc' | 'desc';
  currency?: Currency;
}
export async function getExpenses(
  currency: Currency | null
): Promise<Expense[]> {
  const url = `//localhost:4000/expenses`;

  const params: GetExpensesParams = {
    _sort: 'timestamp',
    _order: 'desc'
  };

  if (currency) {
    params.currency = currency;
  }

  try {
    const res = await axios.get<Expense[]>(url, {
      params
    });
    const { data } = res;
    return data;
  } catch (err) {
    throw err;
  }
}

// TODO cancel pending requests https://stackoverflow.com/questions/49233860/how-to-cancel-previous-axios-with-redux-in-react
export async function getExpense(id: number): Promise<Expense> {
  const url = `${apiUrl}/${id}`;

  const { data } = await axios.get<Expense>(url);
  return data;
}

export async function createExpense(expense: Expense): Promise<Expense> {
  const url = `${apiUrl}`;

  try {
    const { data } = await axios.post<Expense>(url, { ...expense });
    return data;
  } catch (err) {
    throw err;
  }
}

export async function updateExpense(expense: Expense): Promise<Expense> {
  const url = `${apiUrl}/${expense.id}`;

  try {
    const { data } = await axios.put<Expense>(url, { ...expense });
    return data;
  } catch (err) {
    throw err;
  }
}

export async function deleteExpense(id: number): Promise<Boolean> {
  const url = `${apiUrl}/${id}`;

  try {
    const res = await axios.delete<void>(url);
    return true;
  } catch (err) {
    throw err;
  }
}
