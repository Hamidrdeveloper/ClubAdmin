import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CountryManagePage from './Country.page';
import CountryUpsertPage from './CountryUpsert.page';

export default function CountryRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CountryManagePage />} />
      <Route path={`/upsert`} element={<CountryUpsertPage />} />
      <Route path={`/upsert/:country_id`} element={<CountryUpsertPage />} />
    </Routes>
  );
}
