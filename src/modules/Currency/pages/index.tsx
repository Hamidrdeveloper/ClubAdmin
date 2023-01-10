import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CurrencyManagePage from './Currency.page';
import CurrencyUpsertPage from './CurrencyUpsert.page';

export default function CurrencyRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CurrencyManagePage />} />
      <Route path={`/upsert`} element={<CurrencyUpsertPage />} />
      <Route path={`/upsert/:currency_id`} element={<CurrencyUpsertPage />} />
    </Routes>
  );
}
