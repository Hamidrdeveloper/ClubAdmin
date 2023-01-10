import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import CalendarModule from '../Calendar.module';
import { Calendar } from '../model/calendar.entity';

export default function CalendarPage(): ReactElement {
  const { t } = useTranslation();
  const calendarModule = new CalendarModule();

  return (
    <PageLayout<Calendar> module={calendarModule}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew />

        <Panel.ListView
          module={calendarModule}
          tableScroll={{ x: 1450, y: 475 }}
          togglers={[{ dataIndex: 'is_active', title: t('Global.IsActive'), url: 'active' }]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
