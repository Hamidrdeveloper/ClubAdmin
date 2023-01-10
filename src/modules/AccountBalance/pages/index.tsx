import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import AccountBalancePage from './AccountBalance.page';

export default function AccountBalanceRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<AccountBalancePage />} />
    </Routes>
  );
}
