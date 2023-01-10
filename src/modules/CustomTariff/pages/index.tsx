import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import CustomTariffManagePage from './CustomTariff.page';
import CustomTariffUpsertPage from './CustomTariffUpsert.page';

export default function CustomTariffRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CustomTariffManagePage />} />
      <Route path={`/upsert`} element={<CustomTariffUpsertPage />} />
      <Route path={`/upsert/:customTariff_id`} element={<CustomTariffUpsertPage />} />
    </Routes>
  );
}
