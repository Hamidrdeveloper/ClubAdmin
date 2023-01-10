/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Currency } from '../model/currency.entity';
import { currencyAtom, fetchAllCurrenciesAtom } from '../service/currencyStore';
import { Button } from 'antd';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import CurrencyUpsert from './CurrencyUpsert';
import { AtomWithQueryAction } from 'jotai/query';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

interface Props {
  isMulti: boolean;
  isClearable: boolean;
  loading?: boolean;
  disabled?: boolean;
  value:number;
  fetchAll: boolean;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: () => void;
}

function CurrencySelect({
  value,
  isClearable = true,
  loading = false,
  fetchAll = false,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [, setFetchAll] = useAtom(fetchAllCurrenciesAtom);
  const [isVisible, setVisible] = useState(false);
  const [currency, update] = useAtom<Currency[], AtomWithQueryAction, Promise<void>>(currencyAtom);
  useEffect(() => {
    setFetchAll(fetchAll);
  }, [fetchAll]);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Currency[]) : (data as Currency));

  return (
    <>
      <Button type="primary" ghost  icon={<PlusOutlined />} onClick={ (props) => setVisible(true)} />
      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Light'}>
    <CurrencyUpsert
    chantId={value}
      onCallback={() => {
        update({ type: 'refetch' });
        onChange()
      }}
    />
  </SelectWrapper>
    </>
  );
}

export default CurrencySelect;
