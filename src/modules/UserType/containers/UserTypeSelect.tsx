import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { UserType } from '../model/userType.entity';
import { userTypeAtom } from '../service/userTypeStore';
import UserTypeUpsert from './UserTypeUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  placeholder: string;
  value: UserType | UserType[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: UserType | UserType[]) => void;
}

function UserTypeSelect({
  value,
  isMulti = false,
  hasNew = true,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('UserType.Title') }),
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [userTypes, update] = useAtom<UserType[], AtomWithQueryAction, Promise<void>>(userTypeAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as UserType[]) : (data as UserType));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        options={userTypes}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />
      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'UserType.Title'}>
        <UserTypeUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default UserTypeSelect;
