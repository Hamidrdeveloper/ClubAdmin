import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Unit } from '../model/unit.entity';
import { unitAtom } from '../service/unitStore';
import UnitUpsert from './UnitUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Unit | Unit[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Unit | Unit[]) => void;
}

function UnitSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [units, update] = useAtom<Unit[], AtomWithQueryAction, Promise<void>>(unitAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Unit[]) : (data as Unit));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={units ?? []}
        isLoading={!units ? true : undefined}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Unit.Title'}>
        <UnitUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default UnitSelect;
