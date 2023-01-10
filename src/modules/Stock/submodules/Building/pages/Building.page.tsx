import Fallback from '@src/modules/Stock/components/Fallback';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import BuildingModule from '../Building.module';
import { Building } from '../model/Building';

export default function BuildingPage(): ReactElement {
  const { stock_id: warehouseId } = useParams();
  if (!warehouseId) return <Fallback />;

  const buildingModule = new BuildingModule();

  return (
    <PageLayout<Building> module={buildingModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="" />

        <Panel.ListView module={buildingModule} hasUpdate updateLink="" params={{ warehouseId }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
