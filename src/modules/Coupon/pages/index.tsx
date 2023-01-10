import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CouponManagePage from './Coupon.page';
import CouponUpsertPage from './CouponUpsert.page';

export default function CouponRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CouponManagePage />} />
      <Route path={`/upsert`} element={<CouponUpsertPage />} />
      <Route path={`/upsert/:coupon_id`} element={<CouponUpsertPage />} />
    </Routes>
  );
}
