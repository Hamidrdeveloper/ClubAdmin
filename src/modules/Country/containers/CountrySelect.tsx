/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useMemo, useState } from 'react';
import Select, { ActionMeta, OptionTypeBase } from 'react-select';

import { Country } from '../model/country.entity';
import { countryAtom } from '../service/countryStore';
import CurrencyUpsert from '@src/modules/Currency/containers/CurrencyUpsert';
import { Button } from 'antd';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { AtomWithQueryAction } from 'jotai/query';
import CountryUpsert from './CountryUpsert';

interface Props {
  isMulti: boolean;
  loading?: boolean;
  maxHeight: number;
  disabled?: boolean;
  placeholder: string;
  value:number;
  filterFn: (country: Country) => boolean;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: () => void;
}

function CountrySelect({
  value,
  loading = false,
  onChange,
  filterFn,
  maxHeight,
  isMulti = false,
  placeholder = i18n.t('Global.SelectPlaceholder', {
    title: i18n.t('Country.Title', { count: isMulti ? 2 : 1 }),
  }),
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {

  const [isVisible, setVisible] = useState(false);
  const [countries, update] = useAtom<Country[], AtomWithQueryAction, Promise<void>>(countryAtom);
  const options = useMemo(() => {
    if (filterFn) return countries.filter(filterFn);

    return countries;
  }, [filterFn, countries]);



  return (
    <>
      <Button type="primary" ghost  icon={<PlusOutlined />} onClick={ (props) => setVisible(true)} />
      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Vibrate'}>
    <CountryUpsert
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

export default CountrySelect;
