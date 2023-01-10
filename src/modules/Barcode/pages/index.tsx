import React from 'react';
import { Route, Routes } from 'react-router-dom';

import BarcodeManagePage from './Barcode.page';
import BarcodeUpsertPage from './BarcodeUpsert.page';

export default function BarcodeRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<BarcodeManagePage />} />
      <Route path={`/upsert`} element={<BarcodeUpsertPage />} />
      <Route path={`/upsert/:barcode_id`} element={<BarcodeUpsertPage />} />
    </Routes>
  );
}
