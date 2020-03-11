import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Injections } from '../store';

import { Expense } from './expenses';

interface ExpenseDetailState {
  expense: Expense | null;
  isLoadingUpdate: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface ExpenseDetailModel extends ExpenseDetailState {
  fetchExpenseStart: Action<ExpenseDetailModel>;
  fetchExpenseSuccess: Action<ExpenseDetailModel, Expense>;
  fetchExpenseFailure: Action<ExpenseDetailModel, string>;
  fetchExpense: Thunk<ExpenseDetailModel, number, Injections>;

  updateExpenseStart: Action<ExpenseDetailModel>;
  updateExpenseSuccess: Action<ExpenseDetailModel, Expense>;
  updateExpenseFailure: Action<ExpenseDetailModel, string>;
  updateExpense: Thunk<ExpenseDetailModel, Expense, Injections>;

  reset: Action<ExpenseDetailModel>;
}

const initialState: ExpenseDetailState = {
  expense: null,
  isLoading: false,
  isLoadingUpdate: false,
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
  updateExpenseStart: action(state => {
    state.isLoadingUpdate = true;
  }),
  updateExpenseSuccess: action((state, payload) => {
    state.expense = payload;
    state.isLoadingUpdate = false;
    state.error = null;
  }),
  updateExpenseFailure: action((state, payload) => {
    state.isLoadingUpdate = false;
    state.error = payload;
  }),
  updateExpense: thunk(async (actions, payload, { injections }) => {
    const { expenseService } = injections;
    try {
      actions.updateExpenseStart();
      const updatedExpense = await expenseService.updateExpense(payload);
      actions.updateExpenseSuccess(updatedExpense);
    } catch (err) {
      actions.updateExpenseFailure(err.toString());
    }
  }),
  reset: action(_ => ({ ...initialState }))
};

export default updateExpenseModel;
