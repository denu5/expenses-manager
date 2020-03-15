import React, { useState, useEffect, FC } from 'react';
import { Form, Modal, Spin, Button, Row, Alert } from 'antd';
import { useStoreState, useStoreActions } from 'store/hooks';

import { BaseExpense } from 'model/expensesListModel';
import ExpenseForm from 'components/ExpenseForm';

interface Props {
  id: number;
  afterClose?: () => unknown;
}

const DetailModal: FC<Props> = ({ id, afterClose }) => {
  const { fetchExpense, reset } = useStoreActions(state => state.expenseDetail);
  const { updateExpense, reset: resetUpdate } = useStoreActions(
    state => state.updateExpense
  );
  const { deleteExpense, reset: resetDelete } = useStoreActions(
    state => state.deleteExpense
  );

  const {
    isLoading: isFetchLoading,
    expense,
    error: fetchError
  } = useStoreState(state => state.expenseDetail);

  const { isLoading: isUpdateLoading, error: updateError } = useStoreState(
    state => state.updateExpense
  );

  const { isLoading: isDeleteLoading, error: deleteError } = useStoreState(
    state => state.deleteExpense
  );

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  const onSaveUpdate = async (editedExpense: BaseExpense) => {
    if (!expense) return;
    try {
      await updateExpense({ ...{ id }, ...editedExpense });
      hide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!expense) return;
    try {
      await deleteExpense(expense);
      hide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveUpdate = () => {
    form.submit();
  };

  const hide = () => {
    setIsVisible(false);
    reset();
    resetUpdate();
    resetDelete();
  };

  useEffect(() => {
    fetchExpense(id);
  }, [id, fetchExpense]);

  const hasError = () => !!(fetchError || updateError || deleteError);

  const footer =
    isFetchLoading || hasError()
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
          <Button key="back" onClick={hide}>
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
      onCancel={hide}
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
        <Alert
          message="Loading Error"
          description={fetchError}
          type="error"
          showIcon
        />
      )}

      {deleteError && (
        <Alert
          message="Delete Error"
          description={deleteError}
          type="error"
          showIcon
        />
      )}

      {updateError && (
        <Alert
          message="Update Error"
          description={updateError}
          type="error"
          showIcon
        />
      )}

      {expense && !hasError() && (
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
