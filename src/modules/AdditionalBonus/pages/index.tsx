import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AdditionalBonusManagePage from './AdditionalBonus.page';
import AdditionalBonusUpsertPage from './AdditionalBonusUpsert.page';

export default function AdditionalBonusRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<AdditionalBonusManagePage />} />
      <Route path={`/upsert`} element={<AdditionalBonusUpsertPage />} />
      <Route path={`/upsert/:additionalBonus_id`} element={<AdditionalBonusUpsertPage />} />
    </Routes>
  );
}
