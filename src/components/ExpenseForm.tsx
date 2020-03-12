import React from 'react';

import {
  Input,
  InputNumber,
  Form,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col
} from 'antd';
import { fromExpenseToFormData, fromFormDataToExpense } from '../shared/utils';
import {
  DATE_FORMAT,
  TIME_FORMAT,
  CURRENCIES,
  EXPENSE_CATEGORIES,
  DEFAULT_CURRENCY
} from '../shared/constants';

export const ExpenseForm = ({
  onSubmit,
  formRef,
  expense,
  disabled = false
}: any) => {
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
        rules={[{ required: true, message: 'Recipient is required' }]}
        label="Recipient"
        labelAlign="left"
      >
        <Input disabled={disabled} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        labelAlign="left"
        rules={[{ required: true, message: 'Category is required' }]}
      >
        <Select disabled={disabled}>
          {EXPENSE_CATEGORIES.map(category => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={32}>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="date"
            rules={[{ required: true, message: 'Date is required' }]}
            label="Date"
            labelAlign="left"
          >
            <DatePicker
              format={DATE_FORMAT}
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Form.Item
            name="time"
            rules={[{ required: true, message: 'Time is required' }]}
            label="Time"
            labelAlign="left"
          >
            <TimePicker
              format={TIME_FORMAT}
              disabled={disabled}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col xs={24} sm={8} md={8} lg={8} xl={8}>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: 'Currency is required' }]}
          >
            <Select
              disabled={disabled}
              defaultValue={expense?.currency || 'EUR'}
              style={{ minWidth: 100 }}
            >
              {CURRENCIES.map(currency => (
                <Select.Option key={currency} value={currency}>
                  {currency}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              { required: true, message: 'Amount is required' },
              { type: 'number', min: 0 }
            ]}
          >
            <InputNumber style={{ width: '100%' }} disabled={disabled} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ExpenseForm;
