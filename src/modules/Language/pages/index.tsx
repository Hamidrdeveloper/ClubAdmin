import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import LanguageManagePage from './Language.page';

export default function LanguageRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<LanguageManagePage />} />
    </Routes>
  );
}
