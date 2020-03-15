import React from 'react';
import { Statistic, Radio, Row, Col, Card, Affix } from 'antd';

import { RadioChangeEvent } from 'antd/lib/radio';

import { useStoreState, useStoreActions } from 'store/hooks';

import { CURRENCIES } from 'shared/constants';

const ExpensesListControl = () => {
  const { totalSum, filterCurrency, isLoading } = useStoreState(
    state => state.expensesList
  );
  const { setFilterCurrency } = useStoreActions(state => state.expensesList);

  const filterCurrencyChange = (event: RadioChangeEvent) => {
    const value: string = event.target.value;
    setFilterCurrency(value);
  };

  return (
    <Affix offsetTop={0}>
      <Card>
        <Row
          justify="space-between"
          align="middle"
          style={{ minHeight: '4vh' }}
        >
          <Col>
            <Radio.Group
              defaultValue="ALL"
              size="large"
              onChange={filterCurrencyChange}
            >
              <Radio.Button value="ALL">ALL</Radio.Button>
              {CURRENCIES.map(currency => (
                <Radio.Button key={currency} value={currency}>
                  {currency}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Col>

          <Col>
            {filterCurrency && !isLoading && (
              <Statistic
                title="Amount"
                value={totalSum}
                groupSeparator="'"
                precision={2}
                prefix={filterCurrency}
              />
            )}
          </Col>
        </Row>
      </Card>
    </Affix>
  );
};

export default ExpensesListControl;
