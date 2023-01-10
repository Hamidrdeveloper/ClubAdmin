import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CreditManagePage from './Credit.page';
import CreditDetailsPage from './CreditDetails.page';

export default function CreditRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CreditManagePage />} />
      <Route path={`/:credit_id`} element={<CreditDetailsPage />} />
    </Routes>
  );
}
