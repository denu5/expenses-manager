import React from 'react';
import { PageHeader, Button } from 'antd';
import ExpenseForm from '../components/ExpenseForm';

function Detail() {
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title="Detail"
        extra={[
          <Button key="1" type="primary">
            Create
          </Button>
        ]}
      ></PageHeader>

      <ExpenseForm />
    </div>
  );
}

export default Detail;
