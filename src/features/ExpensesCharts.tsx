import React from 'react';
import { Card } from 'antd';

import { Doughnut } from 'react-chartjs-2';

import { useStoreState } from 'store/hooks';
import { getCategoryColor } from 'shared/constants';

const ExpensesCharts: React.FC = () => {
  const { categorySum } = useStoreState(state => state.expensesList);

  const data = {
    labels: Object.keys(categorySum),
    datasets: [
      {
        data: Object.values(categorySum),
        backgroundColor: Object.keys(categorySum).map(c => getCategoryColor(c)),
        hoverBackgroundColor: Object.keys(categorySum).map(c =>
          getCategoryColor(c)
        )
      }
    ]
  };

  const legend = {
    position: 'bottom',
    fullWidth: true
  };

  return (
    <Card>
      <Doughnut legend={legend} data={data} />
    </Card>
  );
};

export default ExpensesCharts;
