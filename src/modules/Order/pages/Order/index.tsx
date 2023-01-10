import React from 'react';
import { Route, Routes } from 'react-router-dom';

import OrderManagePage from './Order.page';
import OrderDetailsPage from './OrderDetails.page';

export default function OrderSaleRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<OrderManagePage />} />
      <Route path={`/:order_id`} element={<OrderDetailsPage />} />
    </Routes>
  );
}
