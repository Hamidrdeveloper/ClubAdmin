import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { OrderModuleType, OrderVat } from '../../model/order.entity';
import { countryIdOrderVat, orderVatAtom, validFromDateOrderVat } from '../../services/stores/vatStore';

interface Props {
  module: OrderModuleType;
  isMulti: boolean;
  validFromDate: Date | string;
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  value: number;
  countryId?: number;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: OrderVat | OrderVat[]) => void;
}

function OrderVatSelect({
  module,
  value,
  countryId,
  validFromDate,
  isMulti = false,
  loading = false,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Order.OrderVat') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [vats] = useAtom<OrderVat[]>(orderVatAtom);
  const [, update] = useAtom(validFromDateOrderVat);
  const [, countryUpdate] = useAtom(countryIdOrderVat);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as OrderVat[]) : (data as OrderVat));

  useEffect(() => {
    update(validFromDate);
  }, [validFromDate]);

  useEffect(() => {
    countryUpdate(countryId);
  }, [countryId]);

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={vats ?? []}
        placeholder={placeholder}
        isLoading={!vats || loading ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => (option?.value ?? 0) + '%'}
        getOptionValue={(option) => String(module === 'purchase' ? option?.value : option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default OrderVatSelect;
