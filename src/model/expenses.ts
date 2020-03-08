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
import { ExpensesListResult } from '../services/expenseService';

export interface Expense {
  id?: number;
  date: string;
  amount: number;
  recipient: string;
  currency: Currency;
  category: ExpenseCategory;
}

interface ExpensesState {
  expenses: Expense[];
  filterCurrency: Currency | null;
  currentPage: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface ExpensesModel extends ExpensesState {
  totalSum: Computed<ExpensesModel, number>;
  setFilterCurrency: Action<ExpensesModel, Currency>;
  setCurrentPage: Action<ExpensesModel, number>;
  onSetCurrentPage: ThunkOn<ExpensesModel>;
  getExpensesStart: Action<ExpensesModel>;
  getExpensesSuccess: Action<ExpensesModel, ExpensesListResult>;
  getExpensesFailure: Action<ExpensesModel, string>;
  fetchExpenses: Thunk<ExpensesModel, void, Injections>;
}

const initialState: ExpensesState = {
  expenses: [],
  filterCurrency: DEFAULT_CURRENCY,
  pageCount: 0,
  currentPage: 1,
  pageSize: 25,
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
  setCurrentPage: action((state, payload) => {
    state.currentPage = payload;
  }),
  getExpensesStart: action(startLoading),
  getExpensesSuccess: action((state, payload) => {
    const { expenses, pageCount, totalCount } = payload;
    state.expenses = expenses;
    state.pageCount = pageCount;
    state.totalCount = totalCount;
    state.isLoading = false;
    state.error = null;
  }),
  getExpensesFailure: action(loadingFailed),
  onSetCurrentPage: thunkOn(
    actions => actions.setCurrentPage || actions.setFilterCurrency,
    actions => {
      actions.fetchExpenses();
    }
  ),
  fetchExpenses: thunk(async (actions, _, { injections, getState }) => {
    const { expenseService } = injections;
    try {
      actions.getExpensesStart();
      const { currentPage, pageSize, filterCurrency } = getState();
      const expenses = await expenseService.getExpenses(
        currentPage,
        pageSize,
        filterCurrency
      );
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
