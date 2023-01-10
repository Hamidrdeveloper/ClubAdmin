import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PartnerManagePage from './Partner.page';
import PartnerTree from './PartnerTree.page';
import PartnerUpsertPage from './PartnerUpsert.page';

export default function PartnerRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PartnerManagePage />} />
      <Route path={`/upsert`} element={<PartnerUpsertPage />} />
      <Route path={`/tree/:partner_id`} element={<PartnerTree />} />
      <Route path={`/upsert/:partner_id`} element={<PartnerUpsertPage />} />
    </Routes>
  );
}
