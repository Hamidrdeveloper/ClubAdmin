import Fallback from '@src/modules/Stock/components/Fallback';
import { warehouseIdAtom } from '@src/modules/Stock/pages/StockManage.page';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import { Regal } from '../model/Regal';
import RegalModule from '../Regal.module';

export default function RegalPage(): ReactElement {
  const [warehouseId] = useAtom(warehouseIdAtom);
  if (!warehouseId) return <Fallback />;

  const regalModule = new RegalModule(warehouseId);

  return (
    <PageLayout<Regal> module={regalModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="" />

        <Panel.ListView module={regalModule} hasUpdate updateLink="" />
      </PageLayout.Panel>
    </PageLayout>
  );
}
