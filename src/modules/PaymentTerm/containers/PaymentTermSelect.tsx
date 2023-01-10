import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { PaymentTerm } from '../model/paymentTerm.entity';
import { paymentTermAtom } from '../service/paymentTermStore';
import PaymentTermUpsert from './PaymentTermUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  placeholder: string;
  value: PaymentTerm | PaymentTerm[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: PaymentTerm | PaymentTerm[]) => void;
}

function PaymentTermSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('PaymentTerm.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [paymentTerms, update] = useAtom<PaymentTerm[], AtomWithQueryAction, Promise<void>>(paymentTermAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as PaymentTerm[]) : (data as PaymentTerm));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        placeholder={placeholder}
        options={paymentTerms ?? []}
        isLoading={!paymentTerms ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => `${option?.description} - ${option?.due_days}`}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'PaymentTerm.Title'}>
        <PaymentTermUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PaymentTermSelect;
