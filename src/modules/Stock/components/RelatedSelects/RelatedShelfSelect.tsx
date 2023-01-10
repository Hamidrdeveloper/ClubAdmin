import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import { ActionMeta, OptionTypeBase } from 'react-select';
import Select from 'react-select';

import ShelfUpsert from '../../submodules/Shelf/containers/ShelfUpsert';
import { Shelf } from '../../submodules/Shelf/model/shelf';
import { relatedShelfAtom } from '../../submodules/Shelf/service/relatedShelfStore';
import { selectedStorageVariationFieldsAtom } from '../StorageVariationForm';

interface Props {
  hasNew: boolean;
  disabled: boolean;
  value: Shelf | null;
  placeholder: string;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Shelf, action: ActionMeta<Shelf> | null) => void;
}

function RelatedShelfSelect({
  value,
  onChange,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.SubModules.Shelf.Title') }),
}: Partial<Props>): ReactElement {
  const [shelves, update] = useAtom<Shelf[], AtomWithQueryAction, Promise<void>>(relatedShelfAtom);

  const [_value, setValue] = useState(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const [isVisible, setVisible] = useState(false);
  const [selected] = useAtom(selectedStorageVariationFieldsAtom);

  const handleChange = (data: OptionTypeBase, action: ActionMeta<Shelf> | null) => {
    onChange?.(data as Shelf, action);
  };

  return (
    <>
      <Select
        autoFocus
        isClearable
        isDisabled={disabled}
        options={shelves ?? []}
        onChange={handleChange}
        placeholder={placeholder}
        menuPlacement={menuPlacement}
        isLoading={!shelves ? true : undefined}
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
        title={'Stock.SubModules.Shelf.Title'}
      >
        <ShelfUpsert
          singleData={selected.regal !== null ? ({ regal: selected.regal } as Shelf) : undefined}
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

export default RelatedShelfSelect;
