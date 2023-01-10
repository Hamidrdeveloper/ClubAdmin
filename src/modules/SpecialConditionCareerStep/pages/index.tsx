import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SpecialConditionCareerStepPage from './SpecialConditionCareerStep.page';
import SpecialConditionCareerStepUpsertPage from './SpecialConditionCareerStepUpsert.page';

export default function SpecialConditionCareerStepRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<SpecialConditionCareerStepPage />} />

      <Route path={`/upsert`} element={<SpecialConditionCareerStepUpsertPage />} />

      <Route
        path={`/upsert/:special_condition_career_step_id`}
        element={<SpecialConditionCareerStepUpsertPage />}
      />
    </Routes>
  );
}
