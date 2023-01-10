import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Role } from '../model/role.entity';
import { roleAtom } from '../service/roleStore';
import RoleUpsert from './RoleUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  isPending: boolean;
  value: Role | Role[];
  placeholder: string;
  menuPlacement: 'top' | 'bottom' | 'auto';
  isClearable: boolean;
  onChange: (data: Role | Role[]) => void;
}

function RoleSelect({
  value,
  hasNew = true,
  isMulti = false,
  disabled = false,
  isPending = false,
  isClearable = true,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Role.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [roles, update] = useAtom<Role[], AtomWithQueryAction, Promise<void>>(roleAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Role[]) : (data as Role));

  return (
    <>
      <Select
        isMulti={isMulti}
        placeholder={placeholder}
        isDisabled={disabled}
        isClearable={isClearable}
        onChange={handleChange}
        options={roles ?? []}
        isLoading={!roles || isPending ? true : undefined}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.title}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Role.Title'}>
        <RoleUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default RoleSelect;
