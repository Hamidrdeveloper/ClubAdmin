/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useCallback, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { PaymentMethod } from '../model/paymentMethod.entity';
import { paymentMethodAtom } from '../service/paymentMethodStore';
import PaymentMethodUpsert from './PaymentMethodUpsert';

interface Props {
  hasNew?: boolean;
  isClearable: boolean;
  isMulti: boolean;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  filter?: Record<string, unknown>;
  value: PaymentMethod | PaymentMethod[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: PaymentMethod | PaymentMethod[]) => void;
  companyId: number;
}

function PaymentMethodSelect({
  value,
  filter: filterObj,
  isClearable = true,
  isMulti = false,
  loading = false,
  hasNew = true,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('PaymentMethod.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [payments, update] = useAtom<PaymentMethod[], AtomWithQueryAction, Promise<void>>(paymentMethodAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => {
    onChange?.(isMulti ? (data as PaymentMethod[]) : (data as PaymentMethod));
  };

  const filterOptions = useCallback(
    (options: PaymentMethod[], filterObj: Record<string, unknown> | undefined) => {
      if (!filterObj) return options;

      const results = options.filter((option) => {
        let found = false;

        for (const key in filterObj) {
          if (filterObj[key] === option[key]) {
            found = true;
          }
        }

        return found;
      });

      return results;
    },
    [filterObj, payments],
  );

  return (
    <>
      <Select
        isClearable={isClearable}
        isMulti={isMulti}
        options={filterOptions(payments, filterObj) ?? []}
        placeholder={placeholder}
        isLoading={!payments || loading ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={payments.find(res => res.id === value)}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'PaymentMethod.Title'}>
        <PaymentMethodUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PaymentMethodSelect;
