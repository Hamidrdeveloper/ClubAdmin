import Fallback from '@src/modules/Stock/components/Fallback';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import { Shelf } from '../model/shelf';
import ShelfModule from '../Shelf.module';

export default function ShelfPage(): ReactElement {
  const [warehouseId] = useAtom(warehouseIdAtom);
  if (!warehouseId) return <Fallback />;

  const shelfModule = new ShelfModule();

  return (
    <PageLayout<Shelf> module={shelfModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="" />

        <Panel.ListView module={shelfModule} hasUpdate updateLink="" params={{ warehouseId }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
