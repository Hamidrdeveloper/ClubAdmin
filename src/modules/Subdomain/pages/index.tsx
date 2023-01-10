import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import SubdomainPage from './Subdomain.page';
import SubdomainUpsertPage from './SubdomainUpsert.page';

function SubdomainRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<SubdomainPage />} />
      <Route path={`/upsert`} element={<SubdomainUpsertPage />} />
      <Route path={`/upsert/:subdomain_id`} element={<SubdomainUpsertPage />} />
    </Routes>
  );
}

export default SubdomainRoutes;
