import React from 'react';
import { PageHeader, Button } from 'antd';
import ExpenseForm, { FormSizeDemo } from '../components/ExpenseForm';

function Create() {
  return (
    <div>
      <PageHeader
        onBack={() => window.history.back()}
        ghost={false}
        title="Add new expense"
        extra={[
          <Button key="1" type="primary">
            Create
          </Button>
        ]}
      ></PageHeader>

      <FormSizeDemo />
    </div>
  );
}

export default Create;
