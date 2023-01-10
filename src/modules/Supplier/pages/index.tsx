import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import SupplierPage from './Supplier.page';
import SupplierManagePage from './SupplierManage.page';

export default function SupplierRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<SupplierPage />} />
      <Route path={`/manage`} element={<SupplierManagePage />} />
      <Route path={`/manage/:supplier_id`} element={<SupplierManagePage />} />
    </Routes>
  );
}
