import { AttributeTypesPure } from '@src/modules/AttributeType';
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { AT_Options } from '../model/attributeOptions.entity';
import AttributeOptionsUpsert from './AttributeOptionsUpsert';

interface Props {
  isMulti: boolean;
  maxHeight: number;
  hasNew: boolean;
  disabled?: boolean;
  value: AT_Options;
  isPending: boolean;
  options: AT_Options[];
  attributeType: AttributeTypesPure;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onAdd: (data: AT_Options) => void;
  onChange: (data: AT_Options | AT_Options[]) => void;
}

function AttributeOptionsSelect({
  value,
  onAdd,
  onChange,
  options,
  isPending,
  maxHeight,
  attributeType,
  hasNew = true,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {
  const [isVisible, setVisible] = useState(false);

  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as AT_Options[]) : (data as AT_Options));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={options}
        isLoading={isPending}
        isDisabled={disabled || isPending}
        onChange={handleChange}
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
            onAdd?.(data);
            setVisible(false);
          }}
          singleData={{ attributeType: attributeType } as AT_Options}
        />
      </SelectWrapper>
    </>
  );
}

export default AttributeOptionsSelect;
