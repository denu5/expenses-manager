import { Action, action, Thunk, thunk } from 'easy-peasy';
import { Injections } from '../store';

import { Expense } from './expenses';

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
  deleteExpenseStart: action(startLoading),
  deleteExpenseSuccess: action((state, payload) => {
    state.deletedExpense = payload;
    state.isLoading = false;
    state.error = null;
  }),
  deleteExpenseFailure: action(loadingFailed),
  deleteExpense: thunk(async (actions, payload, { injections }) => {
    const { expenseService } = injections;
    try {
      actions.deleteExpenseStart();
      const deleted = await expenseService.deleteExpense(150);
      actions.deleteExpenseSuccess(payload);
    } catch (err) {
      actions.deleteExpenseFailure(err.toString());
    }
  })
};

function startLoading(state: DeleteExpenseState) {
  state.isLoading = true;
}

function loadingFailed(state: DeleteExpenseState, payload: string) {
  state.isLoading = false;
  state.error = payload;
}

export default deleteExpenseModel;
