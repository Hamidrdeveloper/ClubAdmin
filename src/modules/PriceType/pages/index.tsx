import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import PriceManagePage from './PriceType.page';
import PriceTypeUpsertPage from './PriceTypeUpsert.page';

export default function CurrencyRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PriceManagePage />} />
      <Route path={`/upsert`} element={<PriceTypeUpsertPage />} />
      <Route path={`/upsert/:priceType_id`} element={<PriceTypeUpsertPage />} />
    </Routes>
  );
}
