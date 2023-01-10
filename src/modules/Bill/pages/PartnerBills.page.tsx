import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { PartnerBillModule } from '../Bill.module';
import { Bill } from '../model/bill.entity';

export default function PartnerBillsPage({ userId }: { userId: number | undefined }): ReactElement {
  const partnerBillsModule = new PartnerBillModule(userId);

  return (
    <>
      <PageLayout<Bill> module={partnerBillsModule}>
        <PageLayout.Panel>
          <Panel.Header hasSearch dontNavigate noListView noDescription module={partnerBillsModule} />
          <Panel.ListView
            noId
            dontNavigate
            module={partnerBillsModule}
            tableScroll={{ x: 1450, y: 750 }}
            params={{ orderBy: { id: 'DESC' } }}
          />
        </PageLayout.Panel>
      </PageLayout>
    </>
  );
}
