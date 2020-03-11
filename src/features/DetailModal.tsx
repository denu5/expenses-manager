import React, { useState, useEffect } from 'react';
import { Form, Modal, Spin, Button } from 'antd';

import { useStoreActions, useStoreState } from '../store/hooks';
import { Expense } from '../model/expensesList';

import ExpenseForm from '../components/ExpenseForm';

function DetailModal({ afterClose, id }: any) {
  const { fetchExpense, reset } = useStoreActions(state => state.expenseDetail);
  const { updateExpense } = useStoreActions(state => state.updateExpense);
  const { deleteExpense } = useStoreActions(state => state.deleteExpense);

  const { isLoading: isFetchLoading, expense } = useStoreState(
    state => state.expenseDetail
  );

  const { isLoading: isUpdateLoading } = useStoreState(
    state => state.updateExpense
  );

  const { isLoading: isDeleteLoading } = useStoreState(
    state => state.deleteExpense
  );

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchExpense(id);
    return () => {
      reset();
    };
  }, [id, fetchExpense, reset]);

  const onSaveUpdate = (editedExpense: Expense) => {
    if (expense) {
      // TODO Footer hide while init loading
      editedExpense.id = expense.id;
      updateExpense(editedExpense).then(() => hide());
    }
  };

  const handleDelete = () => {
    if (expense) {
      deleteExpense(expense).then(() => hide());
    }
  };

  const handleSaveUpdate = () => {
    form.submit();
  };

  const handleCancel = () => {
    hide();
  };

  const hide = () => {
    setIsVisible(false);
  };

  const footer = isFetchLoading
    ? null
    : [
        <Button
          key="delete"
          type="danger"
          loading={isDeleteLoading}
          onClick={handleDelete}
        >
          Delete Expense
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Discard Changes
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isUpdateLoading}
          onClick={handleSaveUpdate}
        >
          Save
        </Button>
      ];

  return (
    <Modal
      title="Edit"
      visible={isVisible}
      confirmLoading={isUpdateLoading}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      okText="Save"
      cancelText="Discard"
      footer={footer}
    >
      <Spin
        size="large"
        tip="Loading Details..."
        spinning={isFetchLoading}
      ></Spin>
      {expense && (
        <ExpenseForm
          onSubmit={onSaveUpdate}
          formRef={form}
          expense={expense}
          disabled={isDeleteLoading || isUpdateLoading}
        />
      )}
    </Modal>
  );
}

export default DetailModal;
