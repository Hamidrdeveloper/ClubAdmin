import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import useInventoryFilter from '../../containers/InventoryUpsert';
import { Inventory } from '../../model/inventory';
import { InventoryModule } from '../../Stock.module';

const InventoryTab = (): ReactElement => {
  const { stock_id: warehouseId } = useParams();
  if (!warehouseId) return <Fallback />;

  const module = new InventoryModule();

  const [storageVariationId, productVariationId, InventoryFilterForm] = useInventoryFilter();

  const params = useMemo(() => {
    return { warehouseId, productVariationId, storageVariationId };
  }, [productVariationId, storageVariationId]);

  return (
    <>
      {InventoryFilterForm}
      <PageLayout<Inventory> module={module}>
        <PageLayout.Panel>
          <Panel.Header hasNew={false} />

          <Panel.ListView module={module} params={params} dontNavigate hasUpdate={false} />
        </PageLayout.Panel>
      </PageLayout>
    </>
  );
};

export default InventoryTab;
