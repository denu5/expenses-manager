import React from 'react';

import { Input, InputNumber, Form, Select, DatePicker, TimePicker } from 'antd';
import { BaseExpense } from '../model/expenses';
import moment, { Moment } from 'moment';
import { ExpenseCategory } from '../constants/expenseTypes';
import { Currency } from '../constants/currencies';

interface ExpenseFormData {
  date: Moment;
  time: Moment;
  amount: number;
  recipient: string;
  currency: Currency;
  category: ExpenseCategory;
}

// TODO move to constants`?
const dateFormat = 'DD-MM-YYYY';
const timeFormat = 'HH:mm';
const unixTimeFormat = 'X';

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

// TODO move to utils

function addTimeToDate(date: Moment, time: Moment): Moment {
  return date.set('hour', time.hours()).set('minute', time.minutes());
}

function momentToUnix(timestamp: Moment): number {
  return parseInt(timestamp.format(unixTimeFormat));
}

function unixToMoment(timestamp: number): Moment[] {
  const ts = moment.unix(timestamp);
  return [moment(ts, dateFormat), moment(ts, timeFormat)];
}

function fromFormDataToExpense(data: ExpenseFormData): BaseExpense {
  const timestamp = momentToUnix(addTimeToDate(data.date, data.time));

  return {
    timestamp: timestamp,
    amount: data.amount,
    recipient: data.recipient,
    currency: data.currency,
    category: data.category
  };
}

function fromExpenseToFormData(data: BaseExpense): ExpenseFormData {
  const [date, time] = unixToMoment(data.timestamp);

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
