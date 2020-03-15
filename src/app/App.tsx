import React, { useState } from 'react';
import './App.css';

import { Layout, PageHeader, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import ExpensesList from 'features/ExpensesList';
import CreateExpenseModal from 'features/CreateExpenseModal';
import DetailModal from 'features/DetailModal';

import ExpensesListControl from 'features/ExpensesListControl';
import ExpensesCharts from 'features/ExpensesCharts';
import ActivityLogsModal from 'features/ActivityLogsModal';

function App() {
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const [isActivityLogsModalVisible, setActivityLogsModalVisible] = useState(
    false
  );

  const [detailId, setDetailId] = useState<number>();

  const afterDetailModalClose = () => {
    setDetailId(undefined);
  };

  return (
    <>
      <Layout>
        <Layout.Content>
          <PageHeader
            title="Expenses Manager"
            ghost={false}
            extra={[
              <Button key="1" onClick={() => setActivityLogsModalVisible(true)}>
                Activity Logs
              </Button>,
              <Button
                key="2"
                type="primary"
                onClick={() => setCreateModalVisible(true)}
              >
                <PlusOutlined /> Add new expense
              </Button>
            ]}
          />
          <ExpensesCharts />
          <ExpensesListControl />
          <ExpensesList onItemClick={item => setDetailId(item.id)} />
        </Layout.Content>

        <Layout.Footer style={{ textAlign: 'center' }}>
          Expenses Manger Demo © 2020 Created by R. Denus
        </Layout.Footer>
      </Layout>
      {isCreateModalVisible && (
        <CreateExpenseModal
          afterClose={() => {
            setCreateModalVisible(false);
          }}
        />
      )}

      {detailId && (
        <DetailModal id={detailId} afterClose={afterDetailModalClose} />
      )}

      {isActivityLogsModalVisible && (
        <ActivityLogsModal
          afterClose={() => {
            setActivityLogsModalVisible(false);
          }}
        />
      )}
    </>
  );
}

export default App;
