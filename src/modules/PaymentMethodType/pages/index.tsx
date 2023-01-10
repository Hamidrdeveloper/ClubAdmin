import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PaymentTermManagePage from './PaymentMethodType.page';
import PaymentMethodTypeUpsertPage from './PaymentMethodTypeUpsert.page';

export default function PaymentTermRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PaymentTermManagePage />} />
      <Route path={`/upsert`} element={<PaymentMethodTypeUpsertPage />} />
      <Route path={`/upsert/:paymentMethodType_id`} element={<PaymentMethodTypeUpsertPage />} />
    </Routes>
  );
}
