import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import UserTypeManagePage from './UserType.page';
import UserTypeUpsertPage from './UserTypeUpsert.page';

export default function UserTypeRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<UserTypeManagePage />} />
      <Route path={`/upsert`} element={<UserTypeUpsertPage />} />
      <Route path={`/upsert/:userType_id`} element={<UserTypeUpsertPage />} />
    </Routes>
  );
}
