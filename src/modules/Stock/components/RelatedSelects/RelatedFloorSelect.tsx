import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import { ActionMeta, OptionTypeBase } from 'react-select';
import Select from 'react-select';

import FloorUpsert from '../../submodules/Floor/containers/FloorUpsert';
import { Floor } from '../../submodules/Floor/model/floor';
import { relatedFloorAtom } from '../../submodules/Floor/service/relatedFloorStore';
import { selectedStorageVariationFieldsAtom } from '../StorageVariationForm';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  placeholder: string;
  value: Floor | null;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Floor, action: ActionMeta<Floor> | null) => void;
}

function RelatedFloorSelect({
  value,
  onChange,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Floor.Title') }),
}: Partial<Props>): ReactElement {
  const [floors, update] = useAtom<Floor[], AtomWithQueryAction, Promise<void>>(relatedFloorAtom);

  const [_value, setValue] = useState<Partial<Floor> | undefined | null>(value);

  useEffect(() => {
    setValue(value);
  }, [value]);

  const [isVisible, setVisible] = useState(false);

  const [selected] = useAtom(selectedStorageVariationFieldsAtom);

  const handleChange = (data: OptionTypeBase, action: ActionMeta<Floor> | null) => {
    onChange?.(data as Floor, action);
  };

  return (
    <>
      <Select
        autoFocus
        isClearable
        options={floors ?? []}
        onChange={handleChange}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        isDisabled={disabled}
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
          singleData={selected.floor !== null ? ({ building: selected.building } as Floor) : undefined}
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

export default RelatedFloorSelect;
