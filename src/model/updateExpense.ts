import { Action, action, Thunk, thunk, ThunkOn, thunkOn } from 'easy-peasy';
import { Injections } from '../store';

import { Expense } from './expenses';
import { StoreModel } from '.';

interface UpdateExpenseState {
  expense: Expense | null;
  isLoading: boolean;
  error: string | null;
}

export interface UpdateExpenseModel extends UpdateExpenseState {
  updateExpenseStart: Action<UpdateExpenseModel>;
  updateExpenseSuccess: Action<UpdateExpenseModel, Expense>;
  updateExpenseFailure: Action<UpdateExpenseModel, string>;
  updateExpense: Thunk<UpdateExpenseModel, Expense, Injections>;
  onUpdateExpenseSuccess: ThunkOn<UpdateExpenseModel, void, StoreModel>;
}

const initialState: UpdateExpenseState = {
  expense: null,
  isLoading: false,
  error: null
};

const updateExpenseModel: UpdateExpenseModel = {
  ...initialState,
  updateExpenseStart: action(state => {
    state.isLoading = true;
  }),
  updateExpenseSuccess: action((state, payload) => {
    state.expense = payload;
    state.isLoading = false;
    state.error = null;
  }),
  updateExpenseFailure: action((state, payload) => {
    state.isLoading = false;
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
  onUpdateExpenseSuccess: thunkOn(
    actions => actions.updateExpenseSuccess,
    (actions, _, { getStoreActions, getState }) => {
      getStoreActions().expensesList.fetchExpenses();
    }
  )
};

export default updateExpenseModel;
