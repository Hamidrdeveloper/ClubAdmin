import React, { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import EmailSubscriptionPage from './EmailSubscription.page';
import EmailSubscriptionUpsertPage from './EmailSubscriptionUpsert.page';

const EmailSubscriptionRoutes = (): ReactElement => {
  return (
    <Routes>
      <Route path={``} element={<EmailSubscriptionPage />} />
      <Route path={`/upsert`} element={<EmailSubscriptionUpsertPage />} />
      <Route path={`/upsert/:email_id`} element={<EmailSubscriptionUpsertPage />} />
    </Routes>
  );
};

export default EmailSubscriptionRoutes;
