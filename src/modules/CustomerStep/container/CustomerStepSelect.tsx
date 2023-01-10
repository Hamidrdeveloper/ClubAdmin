import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { CustomerStepModel } from '../model/CustomerStep.entity';
import { customerStepAtom } from '../service/customerStepStore';

interface Props {
  value: [];
  isMulti: boolean;
  loading: boolean;
  maxHeight: number;
  disabled: boolean;
  placeholder: string;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: CustomerStepModel | CustomerStepModel[]) => void;
}

function CustomerStepSelect({
  value,
  onChange,
  maxHeight,
  loading = false,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('CustomerStep.Title') }),
}: Partial<Props>): ReactElement {
  const [customerSteps] = useAtom<CustomerStepModel[]>(customerStepAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as CustomerStepModel[]) : (data as CustomerStepModel));

  return (
    <Select
      isClearable
      value={value}
      isMulti={isMulti}
      isDisabled={disabled}
      options={customerSteps}
      onChange={handleChange}
      placeholder={placeholder}
      maxMenuHeight={maxHeight}
      menuPlacement={menuPlacement}
      menuPortalTarget={document.body}
      isLoading={loading ? true : undefined}
      getOptionLabel={(option) => option?.name}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      classNamePrefix="react-select"
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
    />
  );
}

export default CustomerStepSelect;
