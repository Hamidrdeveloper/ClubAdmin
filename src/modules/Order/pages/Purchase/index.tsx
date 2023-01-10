import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PurchaseManagePage from './Purchase.page';
import PurchaseDetailsPage from './PurchaseDetails.page';

export default function PurchaseRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PurchaseManagePage />} />
      <Route path={`/:purchase_id`} element={<PurchaseDetailsPage />} />
    </Routes>
  );
}
