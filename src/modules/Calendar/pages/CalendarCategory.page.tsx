import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CalendarCategoryModule from '../CalendarCategory.module';
import { CalendarCategory } from '../model/calendar.entity';

export default function CalendarcategoryPage(): ReactElement {
  const calendarCategoryModule = new CalendarCategoryModule();

  return (
    <PageLayout<CalendarCategory> module={calendarCategoryModule}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew hasDelete />

        <Panel.ListView hasActive module={calendarCategoryModule} tableScroll={{ x: 1450, y: 475 }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
