import React from 'react';
import { Statistic, Radio, Row, Col } from 'antd';

import { RadioChangeEvent } from 'antd/lib/radio';

import { useStoreState, useStoreActions } from 'store/hooks';

import { CURRENCIES } from 'shared/constants';

const ExpensesListFilter = () => {
  const { totalCount, totalSum, filterCurrency } = useStoreState(
    state => state.expensesList
  );

  const { setFilterCurrency } = useStoreActions(state => state.expensesList);

  const filterCurrencyChange = (event: RadioChangeEvent) => {
    const value: string = event.target.value;
    setFilterCurrency(value);
  };

  return (
    <>
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
    </>
  );
};

export default ExpensesListFilter;
