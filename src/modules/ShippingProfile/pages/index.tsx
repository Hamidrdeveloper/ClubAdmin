import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ShippingProfileManagePage from './ShippingProfile.page';
import ShippingProfileUpsertPage from './ShippingProfileUpsert.page';

export default function CurrencyRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ShippingProfileManagePage />} />
      <Route path={`/upsert`} element={<ShippingProfileUpsertPage />} />
      <Route path={`/upsert/:shippingProfile_id`} element={<ShippingProfileUpsertPage />} />
    </Routes>
  );
}
