import {
  Action,
  action,
  Thunk,
  thunk,
  Computed,
  computed,
  thunkOn,
  ThunkOn
} from 'easy-peasy';
import { Injections } from '../store';
import { DEFAULT_CURRENCY, Currency } from '../constants/currencies';
import { ExpenseCategory } from '../constants/expenseTypes';

export interface Expense {
  id?: number;
  timestamp: string;
  amount: number;
  recipient: string;
  currency: Currency;
  category: ExpenseCategory;
}

interface ExpensesState {
  expenses: Expense[];
  filterCurrency: Currency | null;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface ExpensesModel extends ExpensesState {
  totalSum: Computed<ExpensesModel, number>;
  setFilterCurrency: Action<ExpensesModel, Currency>;
  onSetFilters: ThunkOn<ExpensesModel>;
  getExpensesStart: Action<ExpensesModel>;
  getExpensesSuccess: Action<ExpensesModel, Expense[]>;
  getExpensesFailure: Action<ExpensesModel, string>;
  fetchExpenses: Thunk<ExpensesModel, void, Injections>;
}

const initialState: ExpensesState = {
  expenses: [],
  filterCurrency: DEFAULT_CURRENCY,
  totalCount: 0,
  isLoading: false,
  error: null
};

const expensesModel: ExpensesModel = {
  ...initialState,
  totalSum: computed(state => {
    return state.expenses.reduce((acc, item) => acc + item.amount, 0);
  }),
  setFilterCurrency: action((state, payload) => {
    state.filterCurrency = payload;
  }),
  getExpensesStart: action(startLoading),
  getExpensesSuccess: action((state, payload) => {
    state.expenses = payload;
    state.totalCount = payload.length;
    state.isLoading = false;
    state.error = null;
  }),
  getExpensesFailure: action(loadingFailed),
  onSetFilters: thunkOn(
    actions => actions.setFilterCurrency,
    actions => {
      actions.fetchExpenses();
    }
  ),
  fetchExpenses: thunk(async (actions, _, { injections, getState }) => {
    const { expenseService } = injections;
    try {
      actions.getExpensesStart();
      const { filterCurrency } = getState();
      const expenses = await expenseService.getExpenses(filterCurrency);
      actions.getExpensesSuccess(expenses);
    } catch (err) {
      actions.getExpensesFailure(err.toString());
    }
  })
};

function startLoading(state: ExpensesState) {
  state.isLoading = true;
}

function loadingFailed(state: ExpensesState, payload: string) {
  state.isLoading = false;
  state.error = payload;
}

export default expensesModel;
