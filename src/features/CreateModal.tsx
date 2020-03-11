import React, { useState } from 'react';
import { Form, Modal } from 'antd';

import { useStoreActions, useStoreState } from '../store/hooks';
import { Expense } from '../model/expensesList';

import ExpenseForm from '../components/ExpenseForm';

function CreateModal({ afterClose }: any) {
  const { createExpense } = useStoreActions(state => state.createExpense);
  const { isLoading } = useStoreState(state => state.createExpense);

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  const onSubmit = (expense: Expense) => {
    createExpense(expense).then(() => hide()); // TODO notify error?
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    hide();
  };

  const hide = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title="Add new expense"
      visible={isVisible}
      confirmLoading={isLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      okText="Create"
      cancelText="Discard"
    >
      <ExpenseForm onSubmit={onSubmit} isLoading={isLoading} formRef={form} />
    </Modal>
  );
}

export default CreateModal;
