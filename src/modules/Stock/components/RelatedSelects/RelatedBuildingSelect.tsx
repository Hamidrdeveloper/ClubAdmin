// NOTE:  we are not using this file

import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { OptionTypeBase } from 'react-select';

import BuildingUpsert from '../../submodules/Building/containers/BuildingUpsert';
import { Building } from '../../submodules/Building/model/Building';
import { buildingAtom } from '../../submodules/Building/service/buildingStore';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  placeholder: string;
  value: Building;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Building, action: ActionMeta<Building> | null) => void;
}

const RelatedBuildingSelect = ({
  value,
  onChange,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Building.Title') }),
}: Partial<Props>): ReactElement => {
  const [buildings, update] = useAtom<Building[], AtomWithQueryAction, Promise<void>>(buildingAtom);

  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const [isVisible, setVisible] = useState(false);

  const handleChange = (data: OptionTypeBase, action: ActionMeta<Building> | null) => {
    onChange?.(data as Building, action);
  };
  return (
    <>
      <Select
        isClearable
        isMulti={false}
        placeholder={placeholder}
        options={buildings ?? []}
        isLoading={!buildings ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={_value}
      />

      <SelectWrapper
        hideBackBtn
        isVisible={isVisible}
        setVisible={setVisible}
        title={'Stock.SubModules.Building.Title'}
      >
        <BuildingUpsert
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
};

export default RelatedBuildingSelect;
