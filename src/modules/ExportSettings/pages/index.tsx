import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router';

import ExportSettingPage from './ExportSetting.page';
import ExportSettingUpsertPage from './ExportSettingUpsert.page';

export default function ExportTypesRoutes(): ReactElement {
  return (
    <Routes>
      <Route path={``} element={<ExportSettingPage />} />
      <Route path={`/upsert`} element={<ExportSettingUpsertPage />} />
      <Route path={`/upsert/:export_setting_id`} element={<ExportSettingUpsertPage />} />
    </Routes>
  );
}
