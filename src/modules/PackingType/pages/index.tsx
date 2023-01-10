import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import PackingTypeManagePage from './PackingType.page';
import PackingTypeUpsertPage from './PackingTypeUpsert.page';

export default function PackingTypeRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PackingTypeManagePage />} />
      <Route path={`/upsert`} element={<PackingTypeUpsertPage />} />
      <Route path={`/upsert/:packingType_id`} element={<PackingTypeUpsertPage />} />
    </Routes>
  );
}
