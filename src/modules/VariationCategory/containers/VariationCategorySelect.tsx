import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { VariationCategory } from '../model/variationCategory.entity';
import { variationCategoryAtom } from '../service/variationCategoryStore';
import VariationCategoryUpsert from './VariationCategoryUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  placeholder: string;
  value: VariationCategory | VariationCategory[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: VariationCategory | VariationCategory[]) => void;
}

function VariationCategorySelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
  placeholder = i18n.t('Global.SelectPlaceholder', {
    title: i18n.t('VariationCategory.Title', isMulti ? { count: 2 } : {}),
  }),
}: Partial<Props>): ReactElement {
  const [variationCategories, update] = useAtom<VariationCategory[], AtomWithQueryAction, Promise<void>>(
    variationCategoryAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as VariationCategory[]) : (data as VariationCategory));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        options={variationCategories}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'VariationCategory.Title'}>
        <VariationCategoryUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default VariationCategorySelect;
