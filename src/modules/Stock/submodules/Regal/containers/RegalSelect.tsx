import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import { ActionMeta, OptionTypeBase } from 'react-select';
import Select from 'react-select';

import { Regal } from '../model/Regal';
import { regalAtom } from '../service/regalStore';
import RegalUpsert from './RegalUpsert';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  value: Regal | null;
  placeholder: string;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Regal, action: ActionMeta<Regal> | null) => void;
}

function RegalSelect({
  value,
  hasNew = true,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Regal.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [regals, update] = useAtom<Regal[], AtomWithQueryAction, Promise<void>>(regalAtom);

  const [isVisible, setVisible] = useState(false);

  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (data: OptionTypeBase, action: ActionMeta<Regal> | null) => {
    onChange?.(data as Regal, action);
  };

  return (
    <>
      <Select
        autoFocus
        isClearable
        isDisabled={disabled}
        options={regals ?? []}
        onChange={handleChange}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        isLoading={!regals ? true : undefined}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectThem) => reactSelectTheme(selectThem)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        className="react-select"
        value={_value}
      />

      <SelectWrapper
        hideBackBtn
        isVisible={isVisible}
        setVisible={setVisible}
        title={'Stock.SubModules.Regal.Title'}
      >
        <RegalUpsert
          onCallback={(data) => {
            setValue(data);
            handleChange(data, null);
            update({ type: 'refetch' });
            setVisible(false);
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default RegalSelect;
