import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { OptionTypeBase } from 'react-select';
import Select from 'react-select';

import { Stock } from '../model';
import { stockAtom } from '../services/stockStore';

interface Props {
  isMulti: boolean;
  disabled: boolean;
  placeholder: string;
  isClearable: boolean;
  value: Stock | Stock[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Stock | Stock[]) => void;
}
const StockSelect = ({
  value,
  isMulti = false,
  disabled = false,
  isClearable = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement => {
  const [warehouses] = useAtom<Stock[]>(stockAtom);

  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Stock[]) : (data as Stock));

  return (
    <Select
      value={value}
      isMulti={isMulti}
      options={warehouses}
      isDisabled={disabled}
      onChange={handleChange}
      theme={reactSelectTheme}
      className="react-select"
      isClearable={isClearable}
      placeholder={placeholder}
      menuPlacement={menuPlacement}
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => String(option?.id)}
    />
  );
};

export default StockSelect;
