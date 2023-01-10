import React from 'react';
import { Route, Routes } from 'react-router-dom';

import TransportationRulePage from './TransportationRule.page';
import TransportationRuleUpsertPage from './TransportationRuleUpsert.page';

export default function TransportationRuleRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<TransportationRulePage />} />
      <Route path={`/upsert`} element={<TransportationRuleUpsertPage />} />
      <Route path={`/upsert/:id`} element={<TransportationRuleUpsertPage />} />
    </Routes>
  );
}
