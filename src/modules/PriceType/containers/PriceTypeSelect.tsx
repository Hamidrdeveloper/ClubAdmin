/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { PriceType } from '../model/priceType.entity';
import { priceTypeAtom } from '../service/priceTypeStore';
import PriceTypeUpsert from './PriceTypeUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: PriceType | PriceType[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: PriceType | PriceType[]) => void;
}

function PriceTypeSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [priceTypes, update] = useAtom<PriceType[], AtomWithQueryAction, Promise<void>>(priceTypeAtom);
console.log('=================value===================');
console.log(value);
console.log('==================value==================');
  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as PriceType[]) : (data as PriceType));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={priceTypes ?? []}
        isLoading={!priceTypes ? true : undefined}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => `${option?.title}-${new Date(option?.startTime).toUTCString()}`}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={priceTypes.find(res => res.id === value)}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'PriceType.Title'}>
        <PriceTypeUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PriceTypeSelect;
