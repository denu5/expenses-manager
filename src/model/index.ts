import expensesListModel, { ExpensesListModel } from './expensesList';
import expenseDetailModel, { ExpenseDetailModel } from './expenseDetail';

import createExpenseModel, { CreateExpenseModel } from './createExpense';
import deleteExpenseModel, { DeleteExpenseModel } from './deleteExpense';
import updateExpenseModel, { UpdateExpenseModel } from './updateExpense';

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
