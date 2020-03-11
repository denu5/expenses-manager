import React from 'react';

import { Input, InputNumber, Form, Select, DatePicker, TimePicker } from 'antd';
import { fromExpenseToFormData, fromFormDataToExpense } from '../shared/utils';
import { dateFormat, timeFormat } from '../shared/constants';

export const ExpenseForm = ({ onSubmit, formRef, expense }: any) => {
  const formData = expense ? fromExpenseToFormData(expense) : {};

  const onFinish = (formData: any) => {
    onSubmit(fromFormDataToExpense(formData));
  };

  return (
    <Form
      form={formRef}
      layout="vertical"
      onFinish={onFinish}
      initialValues={formData}
      size="large"
    >
      <Form.Item
        name="recipient"
        rules={[{ required: true }]}
        label="Recepient"
        labelAlign="left"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        labelAlign="left"
        rules={[{ required: true, message: 'Category is required' }]}
      >
        <Select>
          <Select.Option value="TRANSPORT">TRANSPORT</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date"
        rules={[{ required: true, message: 'Date is required' }]}
        label="Date"
        labelAlign="left"
      >
        <DatePicker format={dateFormat} />
      </Form.Item>
      <Form.Item
        name="time"
        rules={[{ required: true, message: 'Time is required' }]}
        label="Time"
        labelAlign="left"
      >
        <TimePicker format={timeFormat} />
      </Form.Item>

      <Form.Item
        name="amount"
        rules={[{ required: true }, { type: 'number', min: 0 }]}
        label="Amount"
        labelAlign="left"
      >
        <InputNumber />
      </Form.Item>

      <Form.Item
        name="currency"
        label="Currency"
        labelAlign="left"
        rules={[{ required: true, message: 'Currency is required' }]}
      >
        <Select>
          <Select.Option value="CHF">CHF</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default ExpenseForm;
