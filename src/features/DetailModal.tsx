import React, { useState, useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';

import { useStoreActions, useStoreState } from '../store/hooks';
import { Expense } from '../model/expenses';

import ExpenseForm from '../components/ExpenseForm';

function DetailModal({ afterClose, id }: any) {
  const { fetchExpense, reset, updateExpense } = useStoreActions(
    state => state.expenseDetail
  );

  const { isLoading, expense } = useStoreState(state => state.expenseDetail);

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchExpense(id);

    return function cleanup() {
      reset();
    };
  }, [id]);

  const onSubmit = (expense: Expense) => {
    updateExpense(expense).then(() => hide()); // TODO notify error?
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
      title="Edit"
      visible={isVisible}
      confirmLoading={isLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      okText="Save"
      cancelText="Discard"
    >
      <Spin size="large" tip="Loading Details..." spinning={isLoading}></Spin>
      {expense && (
        <ExpenseForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          formRef={form}
          expense={expense}
        />
      )}
    </Modal>
  );
}

export default DetailModal;
