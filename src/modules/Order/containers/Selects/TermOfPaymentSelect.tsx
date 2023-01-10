import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { OrderTermOfPayment } from '../../model/order.entity';
import { orderTermOfPaymentAtom } from '../../services/stores/termOfPaymentStore';

interface Props {
  placeholder: string;
  loading?: boolean;
  disabled?: boolean;
  value: OrderTermOfPayment;
  onChange: (data: OrderTermOfPayment) => void;
}

function OrderTermOfPaymentSelect({
  value,
  loading = false,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: "Term of Payments" }),
  onChange,
}: Partial<Props>): ReactElement {
  const [termofpayments] = useAtom<OrderTermOfPayment[]>(orderTermOfPaymentAtom);

  const handleChange = (data: OptionTypeBase) => onChange?.(data as OrderTermOfPayment);

  return (
    <>
      <Select
        isClearable
        options={termofpayments ?? []}
        placeholder={placeholder}
        isLoading={!termofpayments || loading ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        getOptionLabel={(option) => option.description ?? option.discount_percentage + '%'}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default OrderTermOfPaymentSelect;
