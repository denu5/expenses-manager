import expensesListModel, { ExpensesListModel } from './expensesListModel';
import expenseDetailModel, { ExpenseDetailModel } from './expenseDetailModel';

import createExpenseModel, { CreateExpenseModel } from './createExpenseModel';
import deleteExpenseModel, { DeleteExpenseModel } from './deleteExpenseModel';
import updateExpenseModel, { UpdateExpenseModel } from './updateExpenseModel';

export interface StoreModel {
  expensesList: ExpensesListModel;
  expenseDetail: ExpenseDetailModel;

  createExpense: CreateExpenseModel;
  deleteExpense: DeleteExpenseModel;
  updateExpense: UpdateExpenseModel;
}

const storeModel: StoreModel = {
  expensesList: expensesListModel,
  expenseDetail: expenseDetailModel,
  createExpense: createExpenseModel,
  deleteExpense: deleteExpenseModel,
  updateExpense: updateExpenseModel
};

export default storeModel;
