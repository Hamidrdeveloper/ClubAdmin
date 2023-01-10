import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SubscriptionManagePage from './Subscription.page';
import SubscriptionDetailsPage from './SubscriptionDetails.page';

export default function SubscriptionRoutes(): React.ReactElement {
  return (
    <Routes>
      <Route path={``} element={<SubscriptionManagePage />} />
      <Route path={`/:subscription_id`} element={<SubscriptionDetailsPage />} />
    </Routes>
  );
}
