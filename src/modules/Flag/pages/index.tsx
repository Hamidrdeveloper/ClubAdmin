import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import FlagManagePage from './Flag.page';
import FlagUpsertPage from './FlagUpsert.page';

export default function FlagRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<FlagManagePage />} />
      <Route path={`/upsert`} element={<FlagUpsertPage />} />
      <Route path={`/upsert/:flag_id`} element={<FlagUpsertPage />} />
    </Routes>
  );
}
