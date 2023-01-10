import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CreditRoutes from './Credit';
import OrderSaleRoutes from './Order';
import PartnerRoutes from './Partner';
import PurchaseRoutes from './Purchase';
import SubscriptionRoutes from './Subscription';

export default function OrderRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={`order-sale/*`} element={<OrderSaleRoutes />} />
      <Route path={`credit/*`} element={<CreditRoutes />} />
      <Route path={`subscription/*`} element={<SubscriptionRoutes />} />
      <Route path={`purchase/*`} element={<PurchaseRoutes />} />
      <Route path={`partner/*`} element={<PartnerRoutes />} />
    </Routes>
  );
}
