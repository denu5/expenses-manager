import expensesModel, { ExpensesModel } from './expenses';
import createExpenseModel, { CreateExpenseModel } from './createExpense';
import deleteExpenseModel, { DeleteExpenseModel } from './deleteExpense';

import expenseDetailModel, { ExpenseDetailModel } from './expenseDetail';

export interface StoreModel {
  expensesList: ExpensesModel;
  createExpense: CreateExpenseModel;
  deleteExpense: DeleteExpenseModel;
  expenseDetail: ExpenseDetailModel;
}

const storeModel: StoreModel = {
  expensesList: expensesModel,
  createExpense: createExpenseModel,
  deleteExpense: deleteExpenseModel,
  expenseDetail: expenseDetailModel
};

export default storeModel;
