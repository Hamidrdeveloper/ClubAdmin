import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import DPDManagePage from './DPD.page';

export default function DPDRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<DPDManagePage />} />
    </Routes>
  );
}
