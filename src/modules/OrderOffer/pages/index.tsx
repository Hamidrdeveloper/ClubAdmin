import React from 'react';
import { Route, Routes } from 'react-router-dom';

import OrderOfferManagePage from './OrderOffer.page';
import OrderOfferUpsertPage from './OrderOfferUpsert.page';

export default function OrderOfferRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<OrderOfferManagePage />} />
      <Route path={`/upsert`} element={<OrderOfferUpsertPage />} />
      <Route path={`/upsert/:orderOffer_id`} element={<OrderOfferUpsertPage />} />
    </Routes>
  );
}
