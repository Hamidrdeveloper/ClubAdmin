import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CompetitionManagePage from './CompetitionManage.page';
import CompetitionEditManagePage from './EditManage.page';
import UserResultListPage from './UserResultList.page';

export default function CompetitionRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CompetitionManagePage />} />
      <Route path={`/manage/:competition_id`} element={<CompetitionEditManagePage />} />
      <Route path={`/:competition_id/users/:user_id`} element={<UserResultListPage />} />
    </Routes>
  );
}
