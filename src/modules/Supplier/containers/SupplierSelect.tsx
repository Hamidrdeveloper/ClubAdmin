import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { OptionTypeBase } from 'react-select';
import Select from 'react-select';

import { Supplier } from '../model/supplier.entity';
import { supplierAtom } from '../service/supplierStore';

interface Props {
  isMulti: boolean;
  disabled?: boolean;
  value: Supplier | Supplier[];
  isClearable: boolean;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Supplier | Supplier[]) => void;
}

function SupplierSelect({
  value,
  isMulti = false,
  disabled = false,
  isClearable = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [suppliers] = useAtom<Supplier[]>(supplierAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Supplier[]) : (data as Supplier));

  return (
    <Select
      value={value}
      isMulti={isMulti}
      options={suppliers}
      isDisabled={disabled}
      onChange={handleChange}
      isClearable={isClearable}
      menuPlacement={menuPlacement}
      classNamePrefix="react-select"
      menuPortalTarget={document.body}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectTheme) => reactSelectTheme(selectTheme)}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      getOptionLabel={(option) => `${option?.people?.first_name} ${option?.people?.last_name}`}
    />
  );
}

export default SupplierSelect;
