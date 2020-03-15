import React, { useState, FC } from 'react';
import { Form, Modal } from 'antd';

import { useStoreActions, useStoreState } from 'store/hooks';
import { BaseExpense } from 'model/expensesListModel';

import ExpenseForm from 'components/ExpenseForm';

interface Props {
  afterClose?: () => unknown;
}

const CreateExpenseModal: FC<Props> = ({ afterClose }) => {
  const { createExpense } = useStoreActions(state => state.createExpense);
  const { isLoading } = useStoreState(state => state.createExpense);

  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(true);

  const onSubmit = async (expense: BaseExpense) => {
    try {
      await createExpense(expense);
      hide();
    } catch (err) {
      console.error(err);
    }
  };

  const handleOk = () => {
    form.submit();
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
      onCancel={hide}
      afterClose={afterClose}
      destroyOnClose={true}
      closable={true}
      okText="Create"
      cancelText="Discard"
    >
      <ExpenseForm onSubmit={onSubmit} disabled={isLoading} formRef={form} />
    </Modal>
  );
};

export default CreateExpenseModal;
