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
import {
  DATE_FORMAT,
  TIME_FORMAT,
  CURRENCIES,
  CATEGORIES,
  DEFAULT_CURRENCY,
  DEFAULT_CATEGORY
} from 'shared/constants';

import { fromExpenseToFormData, fromFormDataToExpense } from 'shared/utils';
import { Expense, BaseExpense } from 'model/expensesListModel';
import { FormInstance } from 'antd/lib/form';

interface Props {
  onSubmit: (expense: BaseExpense) => void;
  expense?: Expense;
  formRef: FormInstance;
  disabled: boolean;
}
export const ExpenseForm: React.FC<Props> = ({
  onSubmit,
  formRef,
  expense,
  disabled = false
}) => {
  const formData = expense
    ? fromExpenseToFormData(expense)
    : { currency: DEFAULT_CURRENCY, category: DEFAULT_CATEGORY };

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
          {CATEGORIES.map(category => (
            <Select.Option key={category} value={category}>
              {category}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Row gutter={32}>
        <Col xs={24} sm={12}>
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
        <Col xs={24} sm={12}>
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
        <Col xs={24} sm={8}>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: 'Currency is required' }]}
          >
            <Select disabled={disabled} style={{ minWidth: 100 }}>
              {CURRENCIES.map(currency => (
                <Select.Option key={currency} value={currency}>
                  {currency}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={16}>
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
