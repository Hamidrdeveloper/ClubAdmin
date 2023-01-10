/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AdminDashboard } from '@modules/AdminDashboard';
import { AuthContext } from '@src/core';
import EmployeeDashboard from '@src/modules/EmployeeDashboard/pages';
import PackerDashboard from '@src/modules/PackerDashboard/pages/PackerDashboard';
import PartnerDashboard from '@src/modules/PartnerDashboard';
import PickerDashboard from '@src/modules/PickerDashboard/pages/PickerDashboard';
import React, { ReactElement, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';

const DashboardRouter: React.FC = () => {
  const { loggedInUserRole } = useContext(AuthContext);

  let DefaultDashboard: ReactElement;
  switch (loggedInUserRole) {
    default:
      DefaultDashboard = <AdminDashboard />;
      break;
  }

  return (
    <Routes>
      <Route path="" element={DefaultDashboard} />
    
    </Routes>
  );
};

export default DashboardRouter;
