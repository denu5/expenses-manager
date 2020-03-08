import React from 'react';

import { Input, InputNumber, Form, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a validate email!',
    number: 'Not a validate number!'
  },
  number: {
    range: 'Amount must be cannot me less then ${min}'
  }
};

const ExpenseForm = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <Form.Item
        name={['expense', 'recipient']}
        label="Recipient"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={['expense', 'amount']}
        label="Amount"
        rules={[{ required: true }, { type: 'number', min: 0 }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item name={['expense', 'website']} label="Website">
        <Input />
      </Form.Item>
      <Form.Item name={['expense', 'introduction']} label="Introduction">
        <Input.TextArea />
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
