import React from 'react';
import { Route, Routes } from 'react-router-dom';

import VariationCategoryPage from './Variation.page';
import VariationUpsertPage from './VariationUpsert.page';

export default function PackageRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<VariationCategoryPage />} />
      <Route path={`/upsert`} element={<VariationUpsertPage />} />
      <Route path={`/upsert/:variationCategory_id`} element={<VariationUpsertPage />} />
    </Routes>
  );
}
