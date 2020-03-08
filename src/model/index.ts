import expensesModel, { ExpensesModel } from './expenses';

export interface StoreModel {
  expenses: ExpensesModel;
}

const storeModel: StoreModel = {
  expenses: expensesModel
};

export default storeModel;
