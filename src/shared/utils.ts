import moment, { Moment } from 'moment';
import { Expense, BaseExpense } from '../model/expenses';
import { unixTimeFormat, dateFormat, timeFormat } from './constants';

interface ExpenseFormData {
  date: Moment;
  time: Moment;
  amount: number;
  recipient: string;
  currency: string;
  category: string;
}

export function addTimeToDate(date: Moment, time: Moment): Moment {
  return date.set('hour', time.hours()).set('minute', time.minutes());
}

export function momentToUnix(timestamp: Moment): number {
  return parseInt(timestamp.format(unixTimeFormat));
}

export function unixToMoment(timestamp: number): Moment[] {
  const ts = moment.unix(timestamp);
  return [moment(ts, dateFormat), moment(ts, timeFormat)];
}

export function fromFormDataToExpense(data: ExpenseFormData): BaseExpense {
  const timestamp = momentToUnix(addTimeToDate(data.date, data.time));

  return {
    timestamp: timestamp,
    amount: data.amount,
    recipient: data.recipient,
    currency: data.currency,
    category: data.category
  };
}

export function fromExpenseToFormData(data: Expense): ExpenseFormData {
  const [date, time] = unixToMoment(data.timestamp);

  return {
    amount: data.amount,
    recipient: data.recipient,
    currency: data.currency,
    category: data.category,
    date,
    time
  };
}
