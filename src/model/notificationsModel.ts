import { ThunkOn, thunkOn } from 'easy-peasy';

import { Expense } from './expensesListModel';
import { StoreModel } from 'model';
import { notification } from 'antd';

enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error'
}

interface NotificationContent {
  message: string;
  description: string;
}

const showNotification = (
  type: NotificationType,
  content: NotificationContent
) => {
  const placement = 'bottomRight';
  const showDelay = 500;
  setTimeout(() => {
    notification[type]({
      ...content,
      placement
    });
  }, showDelay);
};

export interface NotificationsModel {
  onCreateExpenseSuccess: ThunkOn<NotificationsModel, Expense, StoreModel>;
  onDeleteExpenseSuccess: ThunkOn<NotificationsModel, Expense, StoreModel>;
}

const notifcationsModel: NotificationsModel = {
  onCreateExpenseSuccess: thunkOn(
    (actions, storeActions) => storeActions.createExpense.createExpenseSuccess,
    (actions, { payload }) => {
      showNotification(NotificationType.SUCCESS, {
        message: 'Successfully Created',
        description: `The expense for ${payload.recipient} was created`
      });
    }
  ),
  onDeleteExpenseSuccess: thunkOn(
    (actions, storeActions) => storeActions.deleteExpense.deleteExpenseSuccess,
    (actions, { payload }) => {
      showNotification(NotificationType.SUCCESS, {
        message: 'Successfully Deleted',
        description: `The expense for ${payload.recipient} was deleted`
      });
    }
  )
};

export default notifcationsModel;
