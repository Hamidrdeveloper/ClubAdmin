import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import LoginLogsManagePage from './LoginLogs.page';

export default function LoginLogsRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<LoginLogsManagePage />} />
    </Routes>
  );
}
