import React, { useEffect } from 'react';
import { List, Avatar } from 'antd';
import { useStoreState, useStoreActions } from '../store/hooks';
import { Expense } from '../model/expensesList';
import { fromUnixToMoment } from '../shared/utils';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  getCategoryColor
} from '../shared/constants';

function CategoryIcon(category: string) {
  return (
    <Avatar
      size="large"
      shape="square"
      style={{
        backgroundColor: getCategoryColor(category)
      }}
    >
      {category[0]}
    </Avatar>
  );
}

function ListItemSubline(expense: Expense) {
  const [date, time] = fromUnixToMoment(expense.timestamp);
  return (
    <>
      {date.format(DATE_FORMAT)}, {time.format(TIME_FORMAT)}
    </>
  );
}

const CurrencyFormat = ({
  quantity,
  currency
}: {
  quantity: number;
  currency: string;
}) => (
  <span>
    {currency} {quantity.toFixed(2)}
  </span>
);

function ExpensesList({ onItemClick }: any) {
  const { expenses, isLoading } = useStoreState(state => state.expensesList);
  const { fetchExpenses } = useStoreActions(state => state.expensesList);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);
  return (
    <List
      itemLayout="horizontal"
      dataSource={expenses}
      loading={isLoading}
      renderItem={item => (
        <List.Item onClick={() => onItemClick(item.id)}>
          <List.Item.Meta
            style={{
              alignItems: 'center'
            }}
            avatar={CategoryIcon(item.category)}
            title={item.recipient}
            description={ListItemSubline(item)}
          />
          <CurrencyFormat currency={item.currency} quantity={item.amount} />
        </List.Item>
      )}
    />
  );
}

export default ExpensesList;
