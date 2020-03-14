import { Action, action, Thunk, thunk, ThunkOn, thunkOn } from 'easy-peasy';

import { Expense } from './expensesListModel';
import { Injections } from 'store';
import { StoreModel } from 'model';

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
  onCreateExpenseSuccess: ThunkOn<CreateExpenseModel, void, StoreModel>;
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
    state.createdExpense = payload;
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
  }),
  onCreateExpenseSuccess: thunkOn(
    actions => actions.createExpenseSuccess,
    (actions, _, { getStoreActions, getState }) => {
      getStoreActions().expensesList.fetchExpenses();
    }
  )
};

export default createExpenseModel;
