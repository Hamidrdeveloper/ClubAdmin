import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import { OptionTypeBase } from 'react-select';
import Select from 'react-select';

import { Floor } from '../model/floor';
import { floorAtom } from '../service/floorStore';
import FloorUpsert from './FloorUpsert';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  placeholder: string;
  value: Floor;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Floor) => void;
}

function FloorSelect({
  value,
  hasNew = true,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Floor.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [floors, update] = useAtom<Floor[], AtomWithQueryAction, Promise<void>>(floorAtom);

  const [_value, setValue] = useState<Partial<Floor> | undefined>(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const [isVisible, setVisible] = useState(false);

  const handleChange = (data: OptionTypeBase) => {
    onChange?.(data as Floor);
  };

  return (
    <>
      <Select
        autoFocus
        isClearable
        isDisabled={disabled}
        options={floors ?? []}
        onChange={handleChange}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        isLoading={!floors ? true : undefined}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectThem) => reactSelectTheme(selectThem)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        className="react-select"
        backspaceRemovesValue
        escapeClearsValue
        tabSelectsValue
        value={_value}
      />

      <SelectWrapper
        hideBackBtn
        isVisible={isVisible}
        setVisible={setVisible}
        title={'Stock.SubModules.Floor.Title'}
      >
        <FloorUpsert
          onCallback={(data) => {
            setValue(data);
            handleChange(data);
            update({ type: 'refetch' });
            setVisible(false);
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default FloorSelect;
