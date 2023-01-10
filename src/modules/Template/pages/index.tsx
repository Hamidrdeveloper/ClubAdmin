import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TemplateManagePage from './Template.page';
import TemplateUpsertPage from './TemplateUpsert.page';

export default function CurrencyRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<TemplateManagePage />} />
      <Route path={`/upsert`} element={<TemplateUpsertPage />} />
      <Route path={`/upsert/:template_id`} element={<TemplateUpsertPage />} />
    </Routes>
  );
}
