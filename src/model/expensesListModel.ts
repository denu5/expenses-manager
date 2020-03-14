import {
  Action,
  action,
  Thunk,
  thunk,
  Computed,
  computed,
  thunkOn,
  ThunkOn,
  ActionOn,
  actionOn
} from 'easy-peasy';
import { Injections } from 'store';
import { StoreModel } from 'model';
import { DEFAULT_CURRENCY } from 'shared/constants';



export interface BaseExpense {
  timestamp: number;
  amount: number;
  recipient: string;
  currency: string;
  category: string;
}

export interface Expense extends BaseExpense {
  id: number;
}

interface ExpensesListState {
  expenses: Expense[];
  filterCurrency: string | null;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface ExpensesListModel extends ExpensesListState {
  totalSum: Computed<ExpensesListModel, number>;
  setFilterCurrency: Action<ExpensesListModel, string>;
  onSetFilters: ThunkOn<ExpensesListModel>;
  getExpensesStart: Action<ExpensesListModel>;
  getExpensesSuccess: Action<ExpensesListModel, Expense[]>;
  getExpensesFailure: Action<ExpensesListModel, string>;
  fetchExpenses: Thunk<ExpensesListModel, void, Injections>;
  onDeleteExpenseSuccess: ActionOn<ExpensesListModel, StoreModel>;
}

const initialState: ExpensesListState = {
  expenses: [],
  filterCurrency: DEFAULT_CURRENCY,
  totalCount: 0,
  isLoading: false,
  error: null
};

const expensesListModel: ExpensesListModel = {
  ...initialState,
  totalSum: computed(state => {
    return state.expenses.reduce((acc, item) => acc + item.amount, 0);
  }),
  setFilterCurrency: action((state, payload) => {
    state.filterCurrency = payload;
  }),
  onSetFilters: thunkOn(
    actions => actions.setFilterCurrency,
    actions => {
      actions.fetchExpenses();
    }
  ),
  getExpensesStart: action(state => {
    state.isLoading = true;
  }),
  getExpensesSuccess: action((state, payload) => {
    state.expenses = payload;
    state.totalCount = payload.length;
    state.isLoading = false;
    state.error = null;
  }),
  getExpensesFailure: action((state, payload) => {
    state.isLoading = false;
    state.error = payload;
  }),
  fetchExpenses: thunk(async (actions, _, { injections, getState }) => {
    const { expenseService } = injections;
    try {
      actions.getExpensesStart();
      const { filterCurrency } = getState();
      const expenses = await expenseService.getExpensesList(filterCurrency);
      actions.getExpensesSuccess(expenses);
    } catch (err) {
      actions.getExpensesFailure(err.toString());
    }
  }),
  onDeleteExpenseSuccess: actionOn(
    (actions, storeActions) => storeActions.deleteExpense.deleteExpenseSuccess,
    (state, { payload }) => {
      state.expenses = state.expenses.filter(i => i.id !== payload.id);
    }
  )
};

export default expensesListModel;
