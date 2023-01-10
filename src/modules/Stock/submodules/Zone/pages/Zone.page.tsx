import Fallback from '@src/modules/Stock/components/Fallback';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import { Zone } from '../model/zone';
import ZoneModule from '../Zone.module';

export default function ZonePage(): ReactElement {
  const { stock_id: warehouseId } = useParams();
  if (!warehouseId) return <Fallback />;

  const zoneModule = new ZoneModule();

  return (
    <PageLayout<Zone> module={zoneModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="" />

        <Panel.ListView module={zoneModule} hasUpdate updateLink="" params={{ warehouseId }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
