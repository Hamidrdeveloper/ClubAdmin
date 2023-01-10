import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { Tag } from 'antd';
import React, { ReactElement } from 'react';

export const CountryNameRenderer = (countries: Country[]): ReactElement => {
  return (
    <span>
      {countries.map((country) => (
        <Tag color={'geekblue'} key={country.id}>
          {country.name}
        </Tag>
      ))}
    </span>
  );
};
export const CurrencyNameRenderer = (currencies: Currency[]): ReactElement => {
  return (
    <span>
      {currencies.map((currency) => (
        <Tag color={'geekblue'} key={currency.id}>
          {currency.name}
        </Tag>
      ))}
    </span>
  );
};
