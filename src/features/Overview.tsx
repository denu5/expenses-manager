import React, { useEffect, useState } from 'react';
import {
  PageHeader,
  Statistic,
  List,
  Radio,
  Row,
  Col,
  Button,
  Avatar,
  Card,
  Affix
} from 'antd';
import { useStoreState, useStoreActions } from '../store/hooks';

import { UserOutlined } from '@ant-design/icons';

import CurrencyFormat from 'react-currency-formatter';
import { RadioChangeEvent } from 'antd/lib/radio';
import CreateModal from './CreateModal';
import DetailModal from './DetailModal';

import { PlusOutlined } from '@ant-design/icons';
import { CURRENCIES } from '../shared/constants';

function Overview() {
  const {
    expenses,
    totalCount,
    totalSum,
    filterCurrency,
    isLoading
  } = useStoreState(state => state.expensesList);

  const { setFilterCurrency, fetchExpenses } = useStoreActions(
    state => state.expensesList
  );

  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [detailId, setDetailId] = useState<number>();

  const filterCurrencyChange = (event: RadioChangeEvent) => {
    const value: string = event.target.value;
    setFilterCurrency(value);
  };

  const afterDetailModalClose = () => {
    setDetailId(undefined);
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

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

      <Card>
        <List
          itemLayout="horizontal"
          dataSource={expenses}
          loading={isLoading}
          renderItem={item => (
            <List.Item onClick={() => setDetailId(item.id)}>
              <List.Item.Meta
                avatar={<Avatar size="large" icon={<UserOutlined />} />}
                title={item.recipient}
                description={item.category}
              />
              <CurrencyFormat currency={item.currency} quantity={item.amount} />
            </List.Item>
          )}
        />
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
