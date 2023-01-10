import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ShopSettingsPage from './ShopSettings.page';

export default function ShopSettingsRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ShopSettingsPage />} />
    </Routes>
  );
}
