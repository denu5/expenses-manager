import expensesListModel, { ExpensesListModel } from './expensesListModel';
import expenseDetailModel, { ExpenseDetailModel } from './expenseDetailModel';

import createExpenseModel, { CreateExpenseModel } from './createExpenseModel';
import deleteExpenseModel, { DeleteExpenseModel } from './deleteExpenseModel';
import updateExpenseModel, { UpdateExpenseModel } from './updateExpenseModel';

import activityLogsModel, { ActivityLogsModel } from './activityLogsModel';

export interface StoreModel {
  expensesList: ExpensesListModel;
  expenseDetail: ExpenseDetailModel;
  createExpense: CreateExpenseModel;
  deleteExpense: DeleteExpenseModel;
  updateExpense: UpdateExpenseModel;
  activityLogs: ActivityLogsModel;
}

const storeModel: StoreModel = {
  expensesList: expensesListModel,
  expenseDetail: expenseDetailModel,
  createExpense: createExpenseModel,
  deleteExpense: deleteExpenseModel,
  updateExpense: updateExpenseModel,
  activityLogs: activityLogsModel
};

export default storeModel;
