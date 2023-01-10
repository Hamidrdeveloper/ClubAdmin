import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import { OptionTypeBase } from 'react-select';

import ZoneUpsert from '../../submodules/Zone/containers/ZoneUpsert';
import { Zone } from '../../submodules/Zone/model/zone';
import { relatedZoneAtom } from '../../submodules/Zone/service/relatedZoneStore';
import { selectedStorageVariationFieldsAtom } from '../StorageVariationForm';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  value: Zone | null;
  placeholder: string;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Zone, action: ActionMeta<Zone> | null) => void;
}

function RelatedZoneSelect({
  value,
  hasNew = true,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Zone.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [zones, update] = useAtom<Zone[], AtomWithQueryAction, Promise<void>>(relatedZoneAtom);

  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);
  const [selected] = useAtom(selectedStorageVariationFieldsAtom);

  const [isVisible, setVisible] = useState(false);

  const handleChange = (data: OptionTypeBase, action: ActionMeta<Zone> | null) => {
    onChange?.(data as Zone, action);
  };

  return (
    <>
      <Select
        autoFocus
        isClearable
        isDisabled={disabled}
        options={zones ?? []}
        onChange={handleChange}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        isLoading={!zones ? true : undefined}
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
        title={'Stock.SubModules.Zone.Title'}
      >
        <ZoneUpsert
          singleData={selected.floor !== null ? ({ floor: selected.floor } as Zone) : undefined}
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

export default RelatedZoneSelect;
