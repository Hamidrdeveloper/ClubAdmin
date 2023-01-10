import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import ReferrerPage from './Referrer.page';
import ReferrerUpsertPage from './ReferrerUpsert.page';

function ReferrerRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ReferrerPage />} />
      <Route path={`/upsert`} element={<ReferrerUpsertPage />} />
      <Route path={`/upsert/:referrer_id`} element={<ReferrerUpsertPage />} />
    </Routes>
  );
}

export default ReferrerRoutes;
