import Fallback from '@src/modules/Stock/components/Fallback';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import FloorModule from '../Floor.module';
import { Floor } from '../model/floor';

export default function FloorPage(): ReactElement {
  const { stock_id: id } = useParams();
  if (!id) return <Fallback />;

  const floorModule = new FloorModule(id);

  return (
    <PageLayout<Floor> module={floorModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew newLink="" />

        <Panel.ListView module={floorModule} hasUpdate updateLink="" />
      </PageLayout.Panel>
    </PageLayout>
  );
}
