import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import WalletPage from './Wallet.page';

export default function WalletRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<WalletPage />} />
      <Route path={`/:user_id`} element={<WalletPage />} />
    </Routes>
  );
}
