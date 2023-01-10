import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { OrderOffer } from '../model/orderOffer.entity';
import { orderOfferAtom } from '../service/orderOfferStore';
import OrderOfferUpsert from './OrderOfferUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: OrderOffer | OrderOffer[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: OrderOffer | OrderOffer[]) => void;
}

function OrderOfferSelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [offers, update] = useAtom<OrderOffer[], AtomWithQueryAction, Promise<void>>(orderOfferAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as OrderOffer[]) : (data as OrderOffer));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={offers ?? []}
        isLoading={!offers ? true : undefined}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'OrderOffer.Title'}>
        <OrderOfferUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default OrderOfferSelect;
