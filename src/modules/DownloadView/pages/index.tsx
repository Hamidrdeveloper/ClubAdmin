import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import DownloadViewPage from './DownloadView.page';

export default function DownloadViewRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<DownloadViewPage />} />
    </Routes>
  );
}
