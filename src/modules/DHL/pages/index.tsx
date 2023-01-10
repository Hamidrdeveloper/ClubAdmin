import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import DHLPage from './DHL.page';

export default function DHLRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<DHLPage />} />
    </Routes>
  );
}
