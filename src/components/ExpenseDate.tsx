import React, { FC } from 'react';

import { fromUnixToMoment } from 'shared/utils';
import { DATE_FORMAT, TIME_FORMAT } from 'shared/constants';

interface Props {
  timestamp: number;
}

const DateTimeFormat: FC<Props> = ({ timestamp }) => {
  const [date, time] = fromUnixToMoment(timestamp);
  return (
    <>
      {date.format(DATE_FORMAT)}, {time.format(TIME_FORMAT)}
    </>
  );
};

export default DateTimeFormat;
