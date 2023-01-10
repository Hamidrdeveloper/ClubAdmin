import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ProductList from './Product.page';
import ProductsManage from './ProductsManage.page';

export default function ProductCategoryRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ProductList />} />
      <Route path={`manage`} element={<ProductsManage />} />
      <Route path={`manage/:product_id`} element={<ProductsManage />} />
      <Route path={`manage/:product_id/:variation_id`} element={<ProductsManage />} />
    </Routes>
  );
}
