import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductCategoryManagePage from './ProductCategory.page';
import ProductCategoryUpsertPage from './ProductCategoryUpsert.page';

export default function ProductCategoryRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ProductCategoryManagePage />} />
      <Route path={`/upsert`} element={<ProductCategoryUpsertPage />} />
      <Route path={`/upsert/:productCategory_id`} element={<ProductCategoryUpsertPage />} />
    </Routes>
  );
}
