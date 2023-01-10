import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PriceManagePage from './Price.page';
import PriceUpsertPage from './priceUpsert.page';

export default function PageRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PriceManagePage />} />
      <Route path={`/upsert`} element={<PriceUpsertPage />} />
      <Route path={`/upsert/:price_id`} element={<PriceUpsertPage />} />
    </Routes>
  );
}
