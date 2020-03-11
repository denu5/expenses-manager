import expensesModel, { ExpensesModel } from './expenses';
import createExpenseModel, { CreateExpenseModel } from './createExpense';
import deleteExpenseModel, { DeleteExpenseModel } from './deleteExpense';
import updateExpenseModel, { UpdateExpenseModel } from './updateExpense';

import expenseDetailModel, { ExpenseDetailModel } from './expenseDetail';

export interface StoreModel {
  expensesList: ExpensesModel;
  expenseDetail: ExpenseDetailModel;

  createExpense: CreateExpenseModel;
  deleteExpense: DeleteExpenseModel;
  updateExpense: UpdateExpenseModel;
}

const storeModel: StoreModel = {
  expensesList: expensesModel,
  expenseDetail: expenseDetailModel,
  createExpense: createExpenseModel,
  deleteExpense: deleteExpenseModel,
  updateExpense: updateExpenseModel
};

export default storeModel;
