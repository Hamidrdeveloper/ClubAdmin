import React from 'react';
import { Route, Routes } from 'react-router-dom';

import CareerStepPage from './CareerStep.page';
import CareerStepUpsertPage from './CareerStepUpsert.page';

export default function CareerStepRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CareerStepPage />} />
      <Route path={`/upsert/:careerstep_id`} element={<CareerStepUpsertPage />} />
    </Routes>
  );
}
