import React from 'react';
import { Route, Routes } from 'react-router-dom';

import NumberSeriesManagePage from './NumberSeries.page';
import NumberSeriesUpsertPage from './NumberSeriesUpsert.page';

export default function NumberSeriesRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<NumberSeriesManagePage />} />
      <Route path={`/upsert`} element={<NumberSeriesUpsertPage />} />
      <Route path={`/upsert/:numberseries_id`} element={<NumberSeriesUpsertPage />} />
    </Routes>
  );
}
