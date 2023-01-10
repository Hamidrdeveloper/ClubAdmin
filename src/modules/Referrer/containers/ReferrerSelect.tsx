import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Referrer } from '../model/Referrer.entity';
import { referrerAtom } from '../service/referrerStore';
import ReferrerUpsert from './ReferrerUpsert';

interface Props {
  hasNew?: boolean;
  loading?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Referrer | Referrer[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Referrer | Referrer[]) => void;
}

function ReferrerSelect({
  value,
  loading = false,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [referrer, update] = useAtom<Referrer[], AtomWithQueryAction, Promise<void>>(referrerAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Referrer[]) : (data as Referrer));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={referrer ?? []}
        isLoading={!referrer || loading ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => `${option?.id} ${option?.title ?? ''}`}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Referrer.Title'}>
        <ReferrerUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default ReferrerSelect;
