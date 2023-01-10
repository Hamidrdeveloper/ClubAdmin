import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { ShippingMethod } from '../model/shippingMethod.entity';
import { shippingMethodAtom } from '../service/shippingMethodStore';

interface Props {
  isMulti: boolean;
  disabled?: boolean;
  placeholder: string;
  isClearable: boolean;
  value: ShippingMethod | ShippingMethod[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: ShippingMethod | ShippingMethod[]) => void;
}

function ShippingMethodSelect({
  value,
  isMulti = false,
  disabled = false,
  isClearable = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('ShippingMethod.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [shippingMethods] = useAtom<ShippingMethod[]>(shippingMethodAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as ShippingMethod[]) : (data as ShippingMethod));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        isClearable={isClearable}
        placeholder={placeholder}
        options={shippingMethods ?? []}
        isLoading={!shippingMethods ? true : undefined}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default ShippingMethodSelect;
