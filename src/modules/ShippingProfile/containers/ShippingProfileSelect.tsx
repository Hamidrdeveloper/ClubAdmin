import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { ShippingProfile } from '../model/shippingProfile.entity';
import { shippingProfileAtom } from '../service/shippingProfileStore';
import ShippingProfileUpsert from './ShippingProfileUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  pending?: boolean;
  disabled?: boolean;
  value: ShippingProfile | ShippingProfile[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: ShippingProfile | ShippingProfile[]) => void;
}

function ShippingProfileSelect({
  value,
  isMulti = false,
  hasNew = true,
  pending = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [shippingProfiles, update] = useAtom<ShippingProfile[], AtomWithQueryAction, Promise<void>>(
    shippingProfileAtom,
  );

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as ShippingProfile[]) : (data as ShippingProfile));

  return (
    <>
      <Select
        isLoading={pending ? pending : !shippingProfiles ? true : undefined}
        isMulti={isMulti}
        isDisabled={disabled}
        onChange={handleChange}
        options={shippingProfiles ?? []}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'ShippingProfile.Title'}>
        <ShippingProfileUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default ShippingProfileSelect;
