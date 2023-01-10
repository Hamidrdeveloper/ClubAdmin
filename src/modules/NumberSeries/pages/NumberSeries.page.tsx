import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { NumberSeries } from '../model/numberSeries.entity';
import NumberSeriesModule from '../NumberSeries.module';

export default function NumberSeriesPage(): ReactElement {
  const numberSeriesModule = new NumberSeriesModule();
  const { t } = useTranslation();

  return (
    <PageLayout<NumberSeries> module={numberSeriesModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch hasDelete />

        <Panel.ListView
          tableScroll={{ x: 992, y: 475 }}
          togglers={[
            { url: 'date-order', title: t('NumberSeries.Field.DateOrder'), dataIndex: 'date_order' },
            { url: 'active-manual', title: t('NumberSeries.Field.ActiveManual'), dataIndex: 'active_manual' },
          ]}
          module={numberSeriesModule}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
