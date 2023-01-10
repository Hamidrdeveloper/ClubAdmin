import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PaymentMethodManagePage from './PaymentMethod.page';
import PaymentMethodUpsertPage from './PaymentMethodUpsert.page';

export default function PaymentMethodRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PaymentMethodManagePage />} />
      <Route path={`/upsert`} element={<PaymentMethodUpsertPage />} />
      <Route path={`/upsert/:paymentMethod_id`} element={<PaymentMethodUpsertPage />} />
    </Routes>
  );
}
