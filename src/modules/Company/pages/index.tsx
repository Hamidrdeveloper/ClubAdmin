import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CompanyPage from './Company.page';
import CompanyUpsertPage from './CompanyUpsert.page';

export default function CompanyRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CompanyPage />} />
      <Route path={`/upsert`} element={<CompanyUpsertPage />} />
      <Route path={`/upsert/:company_id`} element={<CompanyUpsertPage />} />
    </Routes>
  );
}
