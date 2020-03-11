import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Injections } from '../store';

import { Expense } from './expensesList';

interface ExpenseDetailState {
  expense: Expense | null;
  isLoading: boolean;
  error: string | null;
}

export interface ExpenseDetailModel extends ExpenseDetailState {
  fetchExpenseStart: Action<ExpenseDetailModel>;
  fetchExpenseSuccess: Action<ExpenseDetailModel, Expense>;
  fetchExpenseFailure: Action<ExpenseDetailModel, string>;
  fetchExpense: Thunk<ExpenseDetailModel, number, Injections>;

  reset: Action<ExpenseDetailModel>;
}

const initialState: ExpenseDetailState = {
  expense: null,
  isLoading: false,
  error: null
};

const updateExpenseModel: ExpenseDetailModel = {
  ...initialState,
  fetchExpenseStart: action(state => {
    state.isLoading = true;
  }),
  fetchExpenseSuccess: action((state, payload) => {
    state.expense = payload;
    state.isLoading = false;
    state.error = null;
  }),
  fetchExpenseFailure: action((state, payload) => {
    state.isLoading = false;
    state.error = payload;
  }),
  fetchExpense: thunk(async (actions, payload, { injections }) => {
    const { expenseService } = injections;
    try {
      actions.fetchExpenseStart();
      const expense = await expenseService.getExpense(payload);
      actions.fetchExpenseSuccess(expense);
    } catch (err) {
      actions.fetchExpenseFailure(err.toString());
    }
  }),
  // TODO cancel pending request
  reset: action(_ => ({ ...initialState }))
};

export default updateExpenseModel;
