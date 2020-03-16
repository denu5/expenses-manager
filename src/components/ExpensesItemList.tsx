import React from 'react';
import { List, Typography } from 'antd';

import CurrencyFormat from './CurrencyFormat';
import CategoryIcon from './CategoryIcon';
import DateTimeFormat from './ExpenseDate';
import { Expense } from 'model/expensesListModel';

interface Props {
  onItemClick: (id: Expense) => unknown;
  expenses: Expense[];
  isLoading: boolean;
}

const ExpensesItemList: React.FC<Props> = ({
  onItemClick,
  expenses,
  isLoading
}) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={expenses}
      loading={isLoading}
      renderItem={item => (
        <List.Item onClick={() => onItemClick(item)}>
          <List.Item.Meta
            style={{
              alignItems: 'center'
            }}
            avatar={<CategoryIcon category={item.category} />}
            title={item.recipient}
            description={<DateTimeFormat timestamp={item.timestamp} />}
          />
          <Typography.Text strong>
            <CurrencyFormat currency={item.currency} quantity={item.amount} />
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};

export default ExpensesItemList;
