import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Coupon } from '../model';
import { couponAtom } from '../service/couponStore';
import CouponUpsert from './CouponUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: Coupon | Coupon[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Coupon | Coupon[]) => void;
}

function CouponSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [coupons, update] = useAtom<Coupon[], AtomWithQueryAction, Promise<void>>(couponAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) => onChange?.(isMulti ? (data as Coupon[]) : (data as Coupon));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={coupons ?? []}
        isLoading={!coupons ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Coupon.Title'}>
        <CouponUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default CouponSelect;
