import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import { MovementJournals } from '../model/Movement.entity';
import { variationIdAtom } from '../services/variationStore';
import { MovementModule } from '../Stock.module';

const StockMovementPage = (): ReactElement => {
  const [productVariationId] = useAtom(variationIdAtom);

  const module = new MovementModule();

  return (
    <PageLayout<MovementJournals> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasNew={false} noDescription dontNavigate />

        <Panel.ListView
          noId
          dontNavigate
          module={module}
          hasUpdate={false}
          params={{ productVariationId, orderBy: { created_at: 'DESC' } }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default StockMovementPage;
