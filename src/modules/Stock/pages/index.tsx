import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import StockPage from './Stock.page';
import StockManagePage from './StockManage.page';

function PageRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<StockPage />} />
      <Route path={`/manage`} element={<StockManagePage />} />
      <Route path={`/manage/:stock_id`} element={<StockManagePage />} />
    </Routes>
  );
}

export default PageRoutes;
