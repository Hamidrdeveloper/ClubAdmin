import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { Package } from '../model/package.entity';
import { packageAtom } from '../service/packageStore';
import PackageUpsert from './PackageUpsert';

interface Props {
  value: any;
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: Package | Package[]) => void;
}

function PackageSelect({
  value,
  hasNew = true,
  isMulti = false,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [packages, update] = useAtom<Package[], AtomWithQueryAction, Promise<void>>(packageAtom);

  const [isVisible, setVisible] = useState<boolean>(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as Package[]) : (data as Package));

  const getOptionLabel = (option: Package) => {
    const foundPackage = packages?.find((pack) => pack.id === option?.id);

    if (foundPackage) {
      return `${foundPackage.packingType.name} [ W : ${foundPackage.width} x H : ${foundPackage.height} x L : ${foundPackage.length} ]`;
    } else return '';
  };

  return (
    <>
      <Select
        isClearable
        isMulti={isMulti}
        options={packages}
        isDisabled={disabled}
        onChange={handleChange}
        menuPlacement={menuPlacement}
        getOptionLabel={getOptionLabel}
        getOptionValue={(option) => String(option?.id)}
        theme={(selectTheme) => reactSelectTheme(selectTheme)}
        components={{
          Menu: (props) => SelectMenu({ hasNew, props, onClick: () => setVisible(true) }),
          IndicatorSeparator: () => <span style={{ width: 0 }} />,
        }}
        classNamePrefix="react-select"
        value={value}
      />

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'Package.Title'}>
        <PackageUpsert
          onCallback={(data) => {
            setVisible(false);
            handleChange(data);
            update({ type: 'refetch' });
          }}
        />
      </SelectWrapper>
    </>
  );
}

export default PackageSelect;
