/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Price } from '../model/price.entity';
import { priceAtom } from '../service/priceStore';
import PriceUpsert from './PriceUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Price | Price[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Price | Price[]) => void;
}

function PriceSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [price, update] = useAtom<Price[], AtomWithQueryAction, Promise<void>>(priceAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Price[]) : (data as Price));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={price ?? []}
        isLoading={!price ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        menuPortalTarget={document.body}
        getOptionLabel={(option) => option?.statusTitle}
        getOptionValue={(option) => String(option?.status)}
        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        classNamePrefix="react-select"
        value={price.find(res => res.status === value)}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Price.Title'}>
        <PriceUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PriceSelect;
