import i18n from '@src/core/i18n/config';
import { AttributeTypesPure } from '@src/modules/AttributeType';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import i18next from 'i18next';
import React, { ReactElement, useEffect, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { AT_Options } from '../model/attributeOptions.entity';
import AttributeOptionsUpsert from './AttributeOptionsUpsert';

interface Props {
  isMulti: boolean;
  maxHeight: number;
  hasNew: boolean;
  disabled?: boolean;
  value: AT_Options;
  placeholder: string;
  AT: AttributeTypesPure;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: AT_Options | AT_Options[]) => void;
  refetchFn: (typeId: number, name: number | string) => void;
  ATOptions: AT_Options[];
}

function AttributeOptionsSelect({
  AT,
  name,
  value,
  onChange,
  maxHeight,
  refetchFn,
  hasNew = true,
  ATOptions: arr,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  placeholder = i18next.t('Global.SelectPlaceholder', { title: i18n.t('AttributeOptions.Title') }),
}: Partial<Props> & { name: number }): ReactElement {
  const [options, setOptions] = useState(arr);

  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    setOptions(arr);
  }, [arr]);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as AT_Options[]) : (data as AT_Options));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={options}
        isDisabled={disabled}
        onChange={handleChange}
        placeholder={placeholder}
        maxMenuHeight={maxHeight}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        getOptionLabel={(option) => option?.value}
        getOptionValue={(option) => String(option?.id)}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'AttributeOptions.Title'}>
        <AttributeOptionsUpsert
          onCallback={(data) => {
            if (Array.isArray(value)) {
              handleChange([...value, data]);
            } else {
              handleChange(isMulti ? [data] : data);
            }
            // refetch is the same function as setAttributeOptions in parent component
            if (options?.length) refetchFn?.(options[0]?.attribute_type_id, name);
            setVisible(false);
          }}
          singleData={
            {
              attributeType: AT,
            } as AT_Options
          }
        />
      </SelectWrapper>
    </>
  );
}

export default AttributeOptionsSelect;
