import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import StatusManagePage from './Status.page';
import StatusUpsertPage from './StatusUpsert.page';

export default function StatusRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<StatusManagePage />} />
      <Route path={`/upsert`} element={<StatusUpsertPage />} />
      <Route path={`/upsert/:status_id`} element={<StatusUpsertPage />} />
    </Routes>
  );
}
