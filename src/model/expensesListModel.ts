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

interface CategorySum {
  [key: string]: number;
}

export interface ExpensesListModel extends ExpensesListState {
  totalSum: Computed<ExpensesListModel, number>;
  categorySum: Computed<ExpensesListModel, CategorySum>;
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
  filterCurrency: null,
  totalCount: 0,
  isLoading: false,
  error: null
};

const expensesListModel: ExpensesListModel = {
  ...initialState,
  totalSum: computed(state => {
    return state.expenses.reduce((acc, item) => acc + item.amount, 0);
  }),
  categorySum: computed(state => {
    return calcCategorySum(state.expenses);
  }),
  setFilterCurrency: action((state, payload) => {
    if (payload === 'ALL') {
      state.filterCurrency = null;
      return;
    }
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
    (actions, storeActions) =>
      storeActions.deleteExpense.deleteExpense.startType,
    (state, { payload }) => {
      state.expenses = state.expenses.filter(i => i.id !== payload.id);
    }
  )
};

function calcCategorySum(expenses: Expense[]): CategorySum {
  const res: CategorySum = {};
  expenses.forEach(function(el) {
    res[el.category] = res[el.category]
      ? (res[el.category] += +el.amount)
      : +el.amount;
  });
  return res;
}

export default expensesListModel;
