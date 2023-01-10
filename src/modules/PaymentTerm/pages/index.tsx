import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PaymentTermManagePage from './PaymentTerm.page';
import PaymentTermUpsertPage from './PaymentTermUpsert.page';

export default function PaymentTermRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PaymentTermManagePage />} />
      <Route path={`/upsert`} element={<PaymentTermUpsertPage />} />
      <Route path={`/upsert/:paymentTerm_id`} element={<PaymentTermUpsertPage />} />
    </Routes>
  );
}
