import { Action, action, Thunk, thunk } from 'easy-peasy';

import { Expense } from './expensesList';
import { Injections } from 'store';

interface DeleteExpenseState {
  deletedExpense: Expense | null;
  isLoading: boolean;
  error: string | null;
}

export interface DeleteExpenseModel extends DeleteExpenseState {
  deleteExpenseStart: Action<DeleteExpenseModel>;
  deleteExpenseSuccess: Action<DeleteExpenseModel, Expense>;
  deleteExpenseFailure: Action<DeleteExpenseModel, string>;
  deleteExpense: Thunk<DeleteExpenseModel, Expense, Injections>;
}

const initialState: DeleteExpenseState = {
  deletedExpense: null,
  isLoading: false,
  error: null
};

const deleteExpenseModel: DeleteExpenseModel = {
  ...initialState,
  deleteExpenseStart: action(state => {
    state.isLoading = true;
  }),
  deleteExpenseSuccess: action((state, payload) => {
    state.deletedExpense = payload;
    state.isLoading = false;
    state.error = null;
  }),
  deleteExpenseFailure: action((state, payload) => {
    state.isLoading = false;
    state.error = payload;
  }),
  deleteExpense: thunk(async (actions, payload, { injections }) => {
    const { expenseService } = injections;
    try {
      actions.deleteExpenseStart();
      await expenseService.deleteExpense(payload.id);
      actions.deleteExpenseSuccess(payload);
    } catch (err) {
      actions.deleteExpenseFailure(err.toString());
    }
  })
};

export default deleteExpenseModel;
