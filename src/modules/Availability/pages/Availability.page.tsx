import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import AvailabilityModule from '../Availability.module';
import { Availability } from '../model/Availability.entity';

export default function AvailabilityPage(): ReactElement {
  const availabilityModule = new AvailabilityModule();

  return (
    <PageLayout<Availability> module={availabilityModule}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasNew   />

        <Panel.ListView module={availabilityModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
