import { SelectMenu } from '@src/shared/components/SelectWrapper/SelectMenu';
import SelectWrapper from '@src/shared/components/SelectWrapper/SelectWrapper';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { ProductCategory } from '../model/productCategory.entity';
import { productCategoryAtom } from '../service/productCategoryStore';
import ProductCategoryUpsert from './ProductCategoryUpsert';

interface Props {
  hasNew?: boolean;
  isMulti: boolean;
  disabled?: boolean;
  value: ProductCategory | ProductCategory[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: ProductCategory | ProductCategory[]) => void;
}

function ProductCategorySelect({
  value,
  isMulti = false,
  hasNew = true,
  disabled = false,
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [productCategory] = useAtom<ProductCategory[]>(productCategoryAtom);

  const [isVisible, setVisible] = useState(false);
  const handleChange = (data: OptionTypeBase) =>
    onChange?.(isMulti ? (data as ProductCategory[]) : (data as ProductCategory));

  return (
    <>
      <Select
        isMulti={isMulti}
        isDisabled={disabled}
        isClearable
        onChange={handleChange}
        options={productCategory}
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

      <SelectWrapper isVisible={isVisible} setVisible={setVisible} title={'ProductCategory.Title'}>
        <ProductCategoryUpsert />
      </SelectWrapper>
    </>
  );
}

export default ProductCategorySelect;
