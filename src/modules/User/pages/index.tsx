import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdminPage from './Admin.page';
import EmployeePage from './Employee.page';
import PartnerPage from './Partner.page';
import UserPage from './User.page';
import UserManagePage from './UserManage.page';

export default function PageRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<UserPage />} />

      <Route path={`/user`} element={<UserPage />} />
      <Route path={`/admin`} element={<AdminPage />} />
      <Route path={`/partner`} element={<PartnerPage />} />
      <Route path={`/employee`} element={<EmployeePage />} />
      <Route path={`/manage/:role`} element={<UserManagePage />} />
      <Route path={`/manage/:role/:user_id`} element={<UserManagePage />} />
    </Routes>
  );
}
