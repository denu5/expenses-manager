let faker = require('faker');

let generateExpenses = () => {
  const expenses = [];

  for (let id = 0; id < 300; id++) {
    expenses.push({
      id: id,
      date: faker.date.between(
        '2018-02-20T07:00:00.000Z',
        '2020-02-20T07:00:00.000Z'
      ),
      amount: parseFloat(faker.finance.amount()),
      recipient: faker.company.companyName(),
      category: faker.helpers.randomize(['TRANSPORT', 'FOOD', 'DRINKS']),
      currency: faker.helpers.randomize(['USD', 'CHF', 'EUR'])
    });
  }

  return { expenses };
};

module.exports = generateExpenses;
