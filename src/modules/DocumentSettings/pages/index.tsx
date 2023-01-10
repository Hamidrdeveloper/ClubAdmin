import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import DocumentSettingsPage from './DocumentSettings.page';
import DocumentSettingsUpsertPage from './DocumentSettingsUpsert.page';

export default function DocumentSettingRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<DocumentSettingsPage />} />
      <Route path={`/upsert`} element={<DocumentSettingsUpsertPage />} />
      <Route path={`/upsert/:document_settings_id`} element={<DocumentSettingsUpsertPage />} />
    </Routes>
  );
}
