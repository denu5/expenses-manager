import { ThunkOn, thunkOn, Action, action } from 'easy-peasy';

import { Expense } from './expensesListModel';
import { StoreModel } from 'model';
import { notification } from 'antd';

enum ActivityType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info'
}

interface ActivityContent {
  message: string;
  description: string;
}

interface ActivityLog {
  timestamp: number;
  type: ActivityType;
  content: ActivityContent;
  showNotification: boolean;
}

const showNotification = (activity: ActivityLog) => {
  if (!activity.showNotification) return;

  const placement = 'bottomRight';
  const showDelay = 500;
  setTimeout(() => {
    notification[activity.type]({
      ...activity.content,
      placement
    });
  }, showDelay);
};

export interface ActivityLogsModel {
  logs: ActivityLog[];
  addActivity: Action<ActivityLogsModel, ActivityLog>;
  onCreateExpenseSuccess: ThunkOn<ActivityLogsModel, Expense, StoreModel>;
  onDeleteExpenseSuccess: ThunkOn<ActivityLogsModel, Expense, StoreModel>;
  onUpdateExpenseSuccess: ThunkOn<ActivityLogsModel, Expense, StoreModel>;
}

const activityLogsModel: ActivityLogsModel = {
  logs: [],
  addActivity: action((state, payload) => {
    state.logs.push(payload);
    showNotification(payload);
  }),
  onCreateExpenseSuccess: thunkOn(
    (actions, storeActions) => storeActions.createExpense.createExpenseSuccess,
    (actions, { payload }) => {
      actions.addActivity(
        createActivity(
          ActivityType.SUCCESS,
          'Successfully Created',
          `The expense for ${payload.recipient} was created`,
          true
        )
      );
    }
  ),
  onDeleteExpenseSuccess: thunkOn(
    (actions, storeActions) => storeActions.deleteExpense.deleteExpenseSuccess,
    (actions, { payload }) => {
      actions.addActivity(
        createActivity(
          ActivityType.SUCCESS,
          'Successfully Deleted',
          `The expense for ${payload.recipient} was deleted`,
          true
        )
      );
    }
  ),
  onUpdateExpenseSuccess: thunkOn(
    (actions, storeActions) => storeActions.updateExpense.updateExpenseSuccess,
    (actions, { payload }) => {
      actions.addActivity(
        createActivity(
          ActivityType.SUCCESS,
          'Successfully Updated',
          `The expense for ${payload.recipient} was updated`,
          true
        )
      );
    }
  )
};

function createActivity(
  type: ActivityType,
  message: string,
  description: string,
  showNotification = false
): ActivityLog {
  const timestamp = new Date().getTime();
  return {
    type,
    content: { message, description },
    timestamp,
    showNotification
  };
}

export default activityLogsModel;
