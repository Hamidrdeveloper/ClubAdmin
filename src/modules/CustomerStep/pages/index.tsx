import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CustomerStepPage from './CustomerStep.page';
import CustomerStepUpsertPage from './CustomerStepUpsert.page';

export default function CustomerStepRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CustomerStepPage />} />
      <Route path={`/upsert`} element={<CustomerStepUpsertPage />} />
      <Route path={`/upsert/:id`} element={<CustomerStepUpsertPage />} />
    </Routes>
  );
}
