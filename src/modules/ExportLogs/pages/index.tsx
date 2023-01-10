import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import ExportLogsPage from './ExportLogs.page';

export default function ExportsLogsRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ExportLogsPage />} />
    </Routes>
  );
}
