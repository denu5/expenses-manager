import React, { useState, useEffect } from 'react';
import { Form, Modal, Spin } from 'antd';

import { useStoreActions, useStoreState } from '../store/hooks';
import { Expense } from '../model/expensesList';

import ExpenseForm from '../components/ExpenseForm';

function DetailModal({ afterClose, id }: any) {
  const { fetchExpense, reset } = useStoreActions(state => state.expenseDetail);

  const { updateExpense } = useStoreActions(state => state.updateExpense);

  const { isLoading: isUpdateLoading } = useStoreState(
    state => state.updateExpense
  );

  const { isLoading: isFetchLoading, expense } = useStoreState(
    state => state.expenseDetail
  );

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchExpense(id);
    return () => {
      reset();
    };
  }, [id, fetchExpense, reset]);

  const onSubmit = (editedExpense: Expense) => {
    if (expense) {
      // TODO Footer hide while init loading
      editedExpense.id = expense.id;
      updateExpense(editedExpense).then(() => hide()); // TODO notify error?
    }
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

  // TODO Footer hide while init loading
  return (
    <Modal
      title="Edit"
      visible={isVisible}
      confirmLoading={isUpdateLoading}
      onOk={handleOk}
      onCancel={handleCancel}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      okText="Save"
      cancelText="Discard"
    >
      <Spin
        size="large"
        tip="Loading Details..."
        spinning={isFetchLoading}
      ></Spin>
      {expense && (
        <ExpenseForm onSubmit={onSubmit} formRef={form} expense={expense} />
      )}
    </Modal>
  );
}

export default DetailModal;
