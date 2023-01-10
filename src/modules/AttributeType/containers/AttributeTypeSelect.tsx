import i18n from '@src/core/i18n/config';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { attributeTypeAtom } from '../service/attributeTypeStore';
import AttributeTypeUpsert from './AttributeTypeUpsert';
import { AttributeTypes } from '..';

interface Props {
  hasNew?: boolean;
  disabled?: boolean;
  placeholder: string;
  value: AttributeTypes;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: AttributeTypes) => void;
}

function AttributeTypeSelect({
  value,
  onChange,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('AttributeType.Title') }),
}: Partial<Props>): ReactElement {
  const [attrTypes, update] = useAtom<AttributeTypes[], AtomWithQueryAction, Promise<void>>(
    attributeTypeAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const [_value, setValue] = useState<AttributeTypes | undefined>(value);
  useEffect(() => {
    setValue(value);
  }, [value]);

  const handleChange = (data: OptionTypeBase) => onChange?.(data as AttributeTypes);

  return (
    <>
      <Select
        isClearable
        options={attrTypes ?? []}
        isLoading={!attrTypes ? true : undefined}
        placeholder={placeholder}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        getOptionLabel={(option) => option?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={_value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'AttributeType.Title'}>
        <AttributeTypeUpsert
          onCallback={(data: AttributeTypes) => {
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

export default AttributeTypeSelect;
