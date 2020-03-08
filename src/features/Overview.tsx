import React, { useEffect } from 'react';
import {
  PageHeader,
  Statistic,
  List,
  Avatar,
  Radio,
  Row,
  Col,
  Button,
  Pagination
} from 'antd';
import { Link } from 'react-router-dom';
import { useStoreState, useStoreActions } from '../store/hooks';

import CurrencyFormat from 'react-currency-formatter';
import { RadioChangeEvent } from 'antd/lib/radio';
import { CURRENCIES, Currency } from '../constants/currencies';

function Overview() {
  const {
    expenses,
    totalCount,
    totalSum,
    filterCurrency,
    pageSize,
    currentPage,
    isLoading
  } = useStoreState(state => state.expenses);

  const { setFilterCurrency, fetchExpenses, setCurrentPage } = useStoreActions(
    state => state.expenses
  );

  const filterCurrencyChange = (event: RadioChangeEvent) => {
    const value: Currency = event.target.value;
    setFilterCurrency(value);
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div>
      <PageHeader
        title="Overview"
        ghost={false}
        extra={[
          <Link key="1" to="/create">
            <Button type="primary">Add new expense</Button>
          </Link>
        ]}
      ></PageHeader>

      <Row justify="space-around" align="middle" style={{ height: '10vh' }}>
        <Col span={4}>
          <Statistic title="Total Amount" value={totalSum} precision={2} />
          <Statistic title="Total Items" value={totalCount} />
        </Col>
      </Row>
      <Row justify="space-around" align="middle" style={{ height: '10vh' }}>
        <Radio.Group
          defaultValue={filterCurrency}
          size="large"
          onChange={filterCurrencyChange}
        >
          <Radio.Button value={0}>ALL</Radio.Button>
          {CURRENCIES.map(currency => (
            <Radio.Button key={currency} value={currency}>
              {currency}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Row>
      {totalCount > 0 && (
        <Pagination
          total={totalCount}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          onChange={setCurrentPage}
          pageSize={pageSize}
          current={currentPage}
        />
      )}

      <List
        itemLayout="horizontal"
        dataSource={expenses}
        rowKey={i => i.date}
        loading={isLoading}
        renderItem={item => (
          <Link to={`detail/${item.id}`}>
            <List.Item>
              <List.Item.Meta
                // avatar={
                //   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                // }
                title={item.recipient}
                description={item.category}
              />
              <CurrencyFormat currency={item.currency} quantity={item.amount} />
            </List.Item>
          </Link>
        )}
      />
    </div>
  );
}

export default Overview;
