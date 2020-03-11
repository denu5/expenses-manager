import React from 'react';

import { Input, InputNumber, Form, Select, DatePicker, TimePicker } from 'antd';
import { Expense } from '../model/expenses';
import moment, { Moment } from 'moment';
import { ExpenseCategory } from '../constants/expenseTypes';
import { Currency } from '../constants/currencies';

interface ExpenseFormData {
  date: Moment;
  time: any;
  amount: number;
  recipient: string;
  currency: Currency;
  category: ExpenseCategory;
}

// TODO move to constants`?
const dateFormat = 'YYYY/MM/DD';
const timeFormat = 'HH:mm';
const dbFormat = 'YYYY-MM-DD[T00:00:00.000Z]';

export const ExpenseForm = ({ onSubmit, formRef, expense }: any) => {
  const formData = expense ? expenseToFormData(expense) : {};

  const onFinish = (formData: any) => {
    // TODO what to do with id, pass into form or get from expense?
    onSubmit(formDataToExpense(formData, expense['id']));
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

function formDataToExpense(data: ExpenseFormData, id: number): Expense {
  const timestamp = data.date.add(data.time).format(dbFormat);

  return {
    id,
    timestamp: timestamp,
    amount: data.amount,
    recipient: data.recipient,
    currency: data.currency,
    category: data.category
  };
}

function expenseToFormData(data: Expense): ExpenseFormData {
  // TODO create util functions?
  const date = moment(data.timestamp, dateFormat);
  const time = moment(data.timestamp, timeFormat);

  return {
    amount: data.amount,
    recipient: data.recipient,
    currency: data.currency,
    category: data.category,
    date,
    time
  };
}

export default ExpenseForm;
