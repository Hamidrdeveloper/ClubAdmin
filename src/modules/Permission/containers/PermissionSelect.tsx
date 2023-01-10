import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Permission } from '../model/permission.entity';
import { permissionAtom } from '../service/permissionStore';

interface Props {
  isMulti: boolean;
  disabled?: boolean;
  value: Permission | Permission[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Permission | Permission[]) => void;
}

function PermissionSelect({
  value,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [permission] = useAtom<Permission[]>(permissionAtom);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Permission[]) : (data as Permission));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={permission ?? []}
        isLoading={!permission ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.title}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />
    </>
  );
}

export default PermissionSelect;
