import React from 'react';
import { Route, Routes } from 'react-router-dom';

import RoleManagePage from './Role.page';
import RoleUpsertPage from './RoleUpsert.page';

export default function RoleRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<RoleManagePage />} />
      <Route path={`/upsert`} element={<RoleUpsertPage />} />
      <Route path={`/upsert/:role_id`} element={<RoleUpsertPage />} />
    </Routes>
  );
}
