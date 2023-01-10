import React from 'react';
import { Route, Routes, useParams } from 'react-router-dom';

import LegalConditionPage from './LegalCondition.page';
import LegalConditionUpsertPage from './LegalConditionUpsert.page';

export default function PageRoutes(): React.ReactElement {
  const { name } = useParams();
  return (
    <Routes>
      <Route path={``} element={<LegalConditionPage name={name ?? 'legal_disclosure'} />} />
      <Route path={`/upsert`} element={<LegalConditionUpsertPage name={name ?? 'legal_disclosure'} />} />
      <Route
        path={`/upsert/:legalCondition_id`}
        element={<LegalConditionUpsertPage name={name ?? 'legal_disclosure'} />}
      />
    </Routes>
  );
}
