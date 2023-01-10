import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { AdditionalBonus } from '../model/additionalBonus.entity';
import { additionalBonusAtom } from '../service/additionalBonusStore';
import AdditionalBonusUpsert from './AdditionalBonusUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: AdditionalBonus | AdditionalBonus[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: AdditionalBonus | AdditionalBonus[]) => void;
}

function AdditionalBonusSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [additional, update] = useAtom<AdditionalBonus[], AtomWithQueryAction, Promise<void>>(
    additionalBonusAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as AdditionalBonus[]) : (data as AdditionalBonus));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={additional ?? []}
        isLoading={!additional ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => option?.userType?.name}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'AdditionalBonus.Title'}>
        <AdditionalBonusUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default AdditionalBonusSelect;
