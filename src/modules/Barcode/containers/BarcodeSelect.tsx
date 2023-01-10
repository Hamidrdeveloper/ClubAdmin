import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Barcode } from '../model/barcode.entity';
import { barcodeAtom } from '../service/barcodeStore';
import BarcodeUpsert from './BarcodeUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  className?: string;
  disabled?: boolean;
  showUnused: boolean;
  value: Barcode | Barcode[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Barcode | Barcode[]) => void;
}

function BarcodeSelect({
  value,
  className,
  hasNew = true,
  isMulti = false,
  disabled = false,
  showUnused = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [barcodes, update] = useAtom<Barcode[], AtomWithQueryAction, Promise<void>>(barcodeAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Barcode[]) : (data as Barcode));

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        className={className}
        options={showUnused ? barcodes.filter((barcode) => !barcode.used) : barcodes ?? []}
        isLoading={!barcodes ? true : undefined}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={(option) => `${option?.type} - ${option?.value}`}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Barcode.Title'}>
        <BarcodeUpsert
          onCallback={() => {
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default BarcodeSelect;
