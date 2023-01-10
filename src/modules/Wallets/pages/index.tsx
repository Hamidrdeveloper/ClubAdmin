import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import WalletSettingPage from './WalletSetting.page';

export default function CountryRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<WalletSettingPage />} />
    </Routes>
  );
}
