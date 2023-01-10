import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UnitPage from './Unit.page';
import UnitUpsertPage from './UnitUpsert.page';

export default function UnitPages(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<UnitPage />} />
      <Route path={`/upsert`} element={<UnitUpsertPage />} />
      <Route path={`/upsert/:unit_id`} element={<UnitUpsertPage />} />
    </Routes>
  );
}
