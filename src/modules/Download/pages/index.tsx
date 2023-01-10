import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import DownloadCategoryPage from './DownloadCategory.page';
import DownloadManagePage from './DownloadManage.page';

export default function DownloadRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<DownloadCategoryPage />} />
      <Route path={`/manage`} element={<DownloadManagePage />} />
      <Route path={`/manage/:download_id`} element={<DownloadManagePage />} />
    </Routes>
  );
}
