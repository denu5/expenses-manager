import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Injections } from '../store';

import { Expense } from './expenses';

interface CreateExpenseState {
  createdExpense: Expense | null;
  isLoading: boolean;
  error: string | null;
}

export interface CreateExpenseModel extends CreateExpenseState {
  createExpenseStart: Action<CreateExpenseModel>;
  createExpenseSuccess: Action<CreateExpenseModel, Expense>;
  createExpenseFailure: Action<CreateExpenseModel, string>;
  createExpense: Thunk<CreateExpenseModel, Expense, Injections>;
}

const initialState: CreateExpenseState = {
  createdExpense: null,
  isLoading: false,
  error: null
};

const createExpenseModel: CreateExpenseModel = {
  ...initialState,
  createExpenseStart: action(state => {
    state.isLoading = true;
  }),
  createExpenseSuccess: action((state, payload) => {
    state.createdExpense = payload; // TODO maybe remove if not used in notification
    state.isLoading = false;
    state.error = null;
  }),
  createExpenseFailure: action((state, payload) => {
    state.isLoading = false;
    state.error = payload;
  }),
  createExpense: thunk(async (actions, payload, { injections }) => {
    const { expenseService } = injections;
    try {
      actions.createExpenseStart();
      const expenses = await expenseService.createExpense(payload);
      actions.createExpenseSuccess(expenses);
    } catch (err) {
      actions.createExpenseFailure(err.toString());
    }
  })
};

export default createExpenseModel;
