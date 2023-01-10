import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import CompetitionResultPage from './CompetitionResult.page';

export default function CompetitionResultRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<CompetitionResultPage />} />
    </Routes>
  );
}
