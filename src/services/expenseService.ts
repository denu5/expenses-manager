import axios from 'axios';
import { Expense } from '../model/expensesList';
import { API } from '../shared/constants';

const httpClient = axios.create({ baseURL: API.BASE });

interface GetExpensesParams {
  _sort: string;
  _order: 'asc' | 'desc';
  currency?: string;
}

export async function getExpensesList(
  currency: string | null
): Promise<Expense[]> {
  const params: GetExpensesParams = {
    _sort: 'timestamp',
    _order: 'desc'
  };

  if (currency) {
    params.currency = currency;
  }

  const { data } = await httpClient.get<Expense[]>(`${API.EXPENSES}`, {
    params
  });
  return data;
}

// TODO cancel pending requests https://stackoverflow.com/questions/49233860/how-to-cancel-previous-axios-with-redux-in-react
export async function getExpense(id: number): Promise<Expense> {
  const { data } = await httpClient.get<Expense>(`${API.EXPENSES}/${id}`);
  return data;
}

export async function createExpense(expense: Expense): Promise<Expense> {
  const { data } = await httpClient.post<Expense>(`${API.EXPENSES}`, {
    ...expense
  });
  return data;
}

export async function updateExpense(expense: Expense): Promise<Expense> {
  const { data } = await httpClient.put<Expense>(`${API.BASE}/${expense.id}`, {
    ...expense
  });
  return data;
}

export async function deleteExpense(id: number): Promise<Boolean> {
  return await httpClient.delete(`${API.BASE}/${id}`);
}
