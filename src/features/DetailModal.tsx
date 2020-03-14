import React, { useState, useEffect, FC } from 'react';
import { Form, Modal, Spin, Button, Row, Alert } from 'antd';
import { useStoreState, useStoreActions } from 'store/hooks';

import { Expense } from 'model/expensesListModel';
import ExpenseForm from 'components/ExpenseForm';

interface Props {
  id: number;
  afterClose?: () => unknown;
}

const DetailModal: FC<Props> = ({ id, afterClose }) => {
  const { fetchExpense, reset } = useStoreActions(state => state.expenseDetail);
  const { updateExpense } = useStoreActions(state => state.updateExpense);
  const { deleteExpense } = useStoreActions(state => state.deleteExpense);

  const {
    isLoading: isFetchLoading,
    expense,
    error: fetchError
  } = useStoreState(state => state.expenseDetail);

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

  const footer =
    isFetchLoading || fetchError
      ? null
      : [
          <Button
            key="delete"
            type="link"
            loading={isDeleteLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>,
          <Button key="back" onClick={handleCancel}>
            Discard
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
      title="Edit Expense"
      visible={isVisible}
      confirmLoading={isUpdateLoading}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      onCancel={handleCancel}
      footer={footer}
    >
      <Row justify="space-around" align="middle">
        <Spin
          size="large"
          tip="Loading Details..."
          spinning={isFetchLoading}
        ></Spin>
      </Row>

      {fetchError && (
        <Alert message="Error" description={fetchError} type="error" showIcon />
      )}

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
};

export default DetailModal;
