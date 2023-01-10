import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PackageManagePage from './Package.page';
import PackageUpsertPage from './PackageUpsert.page';

export default function PackageRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PackageManagePage />} />
      <Route path={`/upsert`} element={<PackageUpsertPage />} />
      <Route path={`/upsert/:package_id`} element={<PackageUpsertPage />} />
    </Routes>
  );
}
