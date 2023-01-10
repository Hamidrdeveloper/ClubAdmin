import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import { useAtom } from 'jotai';
import React, { FC } from 'react';

import { StorageVariation } from '../model/storageVariation';
import { warehouseIdAtom } from '../pages/StockManage.page';
import { productVariationIdAtom } from '../services/storageVariationStore';
import { StorageVariationModule } from '../Stock.module';

const StorageVariationAsyncSelect: FC<Partial<SuperSelectProps<StorageVariation>>> = (props) => {
  const [warehouseId] = useAtom(warehouseIdAtom);
  const [productVariationId] = useAtom(productVariationIdAtom);

  return (
    <SuperSelect
      module={new StorageVariationModule()}
      query={{ warehouseId, productVariationId }}
      {...props}
    />
  );
};

export default StorageVariationAsyncSelect;
