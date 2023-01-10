import React from 'react';
import { Route, Routes } from 'react-router-dom';

import PartnerManagePage from './Partner.page';
import PartnerDetailsPage from './PartnerDetails.page';

export default function PartnerRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<PartnerManagePage />} />
      <Route path={`/:partner_id`} element={<PartnerDetailsPage />} />
    </Routes>
  );
}
