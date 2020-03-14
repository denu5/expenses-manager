import React, { useEffect } from 'react';
import { Card } from 'antd';

import { useStoreState, useStoreActions } from 'store/hooks';
import ExpensesItemList from 'components/ExpensesItemList';
import { Expense } from 'model/expensesListModel';

interface Props {
  onItemClick: (expense: Expense) => unknown;
}

const ExpensesList: React.FC<Props> = ({ onItemClick }) => {
  const { expenses, isLoading } = useStoreState(state => state.expensesList);
  const { fetchExpenses } = useStoreActions(state => state.expensesList);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <Card>
      <ExpensesItemList
        expenses={expenses}
        isLoading={isLoading}
        onItemClick={onItemClick}
      />
    </Card>
  );
};

export default ExpensesList;
