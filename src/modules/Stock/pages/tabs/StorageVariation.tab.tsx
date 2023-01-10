import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import Fallback from '../../components/Fallback';
import StorageVariationUpsert from '../../containers/StorageVariationUpsert';
import { StorageVariation } from '../../model/storageVariation';
import { StorageVariationModule } from '../../Stock.module';
import { warehouseIdAtom } from '../StockManage.page';

const StorageVariationTab = (): ReactElement => {
  const [warehouseId] = useAtom(warehouseIdAtom);
  if (!warehouseId) return <Fallback />;

  const module = new StorageVariationModule();

  return (
    <>
      <PageLayout<StorageVariation> module={module}>
        <PageLayout.Panel>
          <StorageVariationUpsert />
          <Panel.Header hasNew={false} noDescription />

          <Panel.ListView module={module} hasUpdate={false} params={{ warehouseId }} />
        </PageLayout.Panel>
      </PageLayout>
    </>
  );
};

export default StorageVariationTab;
