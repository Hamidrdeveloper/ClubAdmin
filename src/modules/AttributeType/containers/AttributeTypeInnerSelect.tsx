import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import AttributeTypeUpsert from './AttributeTypeUpsert';
import { AttributeTypes } from '..';

interface Props {
  hasNew?: boolean;
  disabled?: boolean;
  value: AttributeTypes;
  options: AttributeTypes[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onAdd: (data: AttributeTypes) => void;
  onSelect: (data: AttributeTypes) => void;
  onChange: (data: AttributeTypes) => void;
}

function AttributeTypeInnerSelect({
  value,
  options,
  onAdd,
  onChange,
  onSelect,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
}: Partial<Props>): ReactElement {
  const [isVisible, setVisible] = useState(false);

  const handleChange = (data: OptionTypeBase) => {
    onSelect?.(data as AttributeTypes);
    onChange?.(data as AttributeTypes);
  };

  return (
    <>
      <Select
        isClearable
        options={options}
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
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'AttributeType.Title'}>
        <AttributeTypeUpsert
          onCallback={(data: AttributeTypes) => {
            onAdd?.(data);
            handleChange(data);
            setVisible(false);
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default AttributeTypeInnerSelect;
