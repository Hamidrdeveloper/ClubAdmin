import i18n from '@src/core/i18n/config';
import { reactSelectTheme } from '@src/shared/utils';
import { useAtom } from 'jotai';
import { AtomWithQueryAction } from 'jotai/query';
import React, { ReactElement, useEffect } from 'react';
import Select, { OptionTypeBase } from 'react-select';

import { StorageVariation } from '../model/storageVariation';
import { productVariationIdAtom, storageVariationAtom } from '../services/storageVariationStore';

interface Props {
  disabled: boolean;
  placeholder: string;
  productVariationId?: number;
  value: StorageVariation | StorageVariation[];
  menuPlacement: 'top' | 'bottom' | 'auto';
  onChange: (data: StorageVariation | StorageVariation[]) => void;
}

function StorageVariationSelect({
  value,
  productVariationId,
  disabled = false,
  placeholder = i18n.t('Global.SelectPlaceholder', { title: i18n.t('Stock.StorageVariation.Title') }),
  menuPlacement = 'bottom',
  onChange,
}: Partial<Props>): ReactElement {
  const [storageVariations] = useAtom<StorageVariation[], AtomWithQueryAction, Promise<void>>(
    storageVariationAtom,
  );

  const [, setProductVariationIdFilter] = useAtom(productVariationIdAtom);

  useEffect(() => {
    if (productVariationId) setProductVariationIdFilter(productVariationId);
  }, [productVariationId]);

  const handleChange = (data: OptionTypeBase) => {
    onChange?.(data as StorageVariation);
  };

  return (
    <Select
      autoFocus
      isClearable
      isDisabled={disabled}
      options={storageVariations ?? []}
      onChange={handleChange}
      placeholder={placeholder}
      menuPlacement={menuPlacement}
      isLoading={!storageVariations ? true : undefined}
      getOptionLabel={(op) => op.name}
      getOptionValue={(option) => String(option?.id)}
      theme={(selectThem) => reactSelectTheme(selectThem)}
      components={{
        IndicatorSeparator: () => <span style={{ width: 0 }} />,
      }}
      className="react-select"
      value={value}
    />
  );
}

export default StorageVariationSelect;
