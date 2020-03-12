import React, { useState } from 'react';
import {
  PageHeader,
  Statistic,
  Radio,
  Row,
  Col,
  Button,
  Card,
  Affix
} from 'antd';

import { RadioChangeEvent } from 'antd/lib/radio';

import { PlusOutlined } from '@ant-design/icons';
import { useStoreState, useStoreActions } from 'store/hooks';
import ExpensesList from 'components/ExpensesList';
import CreateModal from './CreateModal';
import DetailModal from './DetailModal';

function Overview() {
  const { totalCount, totalSum, filterCurrency } = useStoreState(
    state => state.expensesList
  );

  const { setFilterCurrency } = useStoreActions(state => state.expensesList);

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [detailId, setDetailId] = useState<number>();

  const afterDetailModalClose = () => {
    setDetailId(undefined);
  };

  const filterCurrencyChange = (event: RadioChangeEvent) => {
    const value: string = event.target.value;
    setFilterCurrency(value);
  };

  return (
    <>
      <PageHeader
        title="Expenses Manager"
        ghost={false}
        extra={[
          <Button
            key="1"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            <PlusOutlined /> Add new expense
          </Button>
        ]}
      ></PageHeader>

      {/* <Row justify="space-around" align="middle" style={{ height: '10vh' }}>
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
      </Row> */}

      <Card>
        <ExpensesList onItemClick={setDetailId} />
      </Card>

      {isCreateModalVisible && (
        <CreateModal
          afterClose={() => {
            setCreateModalVisible(false);
          }}
        />
      )}

      {detailId && (
        <DetailModal id={detailId} afterClose={afterDetailModalClose} />
      )}
    </>
  );
}

export default Overview;
