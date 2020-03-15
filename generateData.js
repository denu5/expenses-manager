const faker = require('faker');
const moment = require('moment');
require('dotenv').config();

function arrayFromEnv(arr) {
  if (!arr) {
    return [];
  }
  return arr.split(',');
}

let generateExpenses = () => {
  const expenses = [];

  for (let id = 0; id < 300; id++) {
    const timestamp = moment(
      faker.date.between('2018-02-20T07:00:00.000Z', '2020-02-20T07:00:00.000Z')
    ).format('X');

    expenses.push({
      id: id,
      timestamp: parseInt(timestamp),
      amount: parseFloat(faker.finance.amount()),
      recipient: faker.company.companyName(),
      category: faker.helpers.randomize(
        arrayFromEnv(process.env.SERVER_CATEGORIES)
      ),
      currency: faker.helpers.randomize(
        arrayFromEnv(process.env.SERVER_CURRENCIES)
      )
    });
  }

  return { expenses };
};

module.exports = generateExpenses;
