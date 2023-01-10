import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import ExportTypePage from './ExportType.page';
import ExportTypeEditPage from './ExportTypeEdit.page';

export default function ExportsRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ExportTypePage />} />
      <Route path={`/edit/:export_type_id`} element={<ExportTypeEditPage />} />
    </Routes>
  );
}
