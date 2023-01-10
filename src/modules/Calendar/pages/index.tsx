import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CalendarManagePage from './Calendar.page';
import CalendarCategoryManagePage from './CalendarCategory.page';
import CalendarCategoryUpsertManagePage from './CalendarCategoryUpsert.page';
import CalendarUpsertPage from './CalendarUpsert.page';
import CalendarViewPage from './CalendarView.page';

export default function CountryRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CalendarManagePage />} />
      <Route path={`/upsert`} element={<CalendarUpsertPage />} />
      <Route path={`/events/:calendar_id`} element={<CalendarViewPage />} />
      <Route path={`/upsert/:calendar_id`} element={<CalendarUpsertPage />} />

      <Route path={`/category`} element={<CalendarCategoryManagePage />} />
      <Route path={`/category/upsert`} element={<CalendarCategoryUpsertManagePage />} />
      <Route path={`/category/upsert/:category_id`} element={<CalendarCategoryUpsertManagePage />} />
    </Routes>
  );
}
