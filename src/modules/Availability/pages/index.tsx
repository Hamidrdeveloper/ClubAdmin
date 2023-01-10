import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import AvailabilityPage from './Availability.page';
import AvailabilityUpsertPage from './AvailabilityUpsert.page';

function AvailabilityRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<AvailabilityPage />} />
      <Route path={`/upsert`} element={<AvailabilityUpsertPage />} />
      <Route path={`/upsert/:availability_id`} element={<AvailabilityUpsertPage />} />
    </Routes>
  );
}

export default AvailabilityRoutes;
