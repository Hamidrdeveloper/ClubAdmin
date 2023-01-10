import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailsPage from '../Order/OrderDetails.page';

export default function SubscriptionDetailsPage(): ReactElement {
  const { subscription_id } = useParams();

  return <OrderDetailsPage moduleType={'subscription'} id={Number(subscription_id)} />;
}
