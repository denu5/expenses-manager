import React from 'react';
import { PageHeader, Button } from 'antd';
import ExpenseForm from '../components/ExpenseForm';

function Create() {
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        title="Add new expense"
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

export default Create;
