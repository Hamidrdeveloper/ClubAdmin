import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { PaymentMethodType } from '../model/paymentMethodType.entity';
import { paymentMethodTypeAtom } from '../service/paymentMethodTypeStore';
import PaymentMethodTypeUpsert from './PaymentMethodTypeUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: PaymentMethodType | PaymentMethodType[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: PaymentMethodType | PaymentMethodType[]) => void;
}

function PaymentMethodTypeSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [paymentTypes, update] = useAtom<PaymentMethodType[], AtomWithQueryAction, Promise<void>>(
    paymentMethodTypeAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as PaymentMethodType[]) : (data as PaymentMethodType));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={paymentTypes ?? []}
        isLoading={!paymentTypes ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.title}
        getOptionValue={(option) => String(option?.id)}
        menuPortalTarget={document.body}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'PaymentMethodType.Title'}>
        <PaymentMethodTypeUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PaymentMethodTypeSelect;
