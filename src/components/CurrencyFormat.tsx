import React, { FC } from 'react';

interface Props {
  quantity: number;
  currency: string;
}

const CurrencyFormat: FC<Props> = ({ quantity, currency }) => (
  <span>
    {currency} {quantity.toFixed(2)}
  </span>
);
export default CurrencyFormat;
