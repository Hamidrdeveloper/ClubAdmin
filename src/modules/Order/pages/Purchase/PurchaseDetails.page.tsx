import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailsPage from '../Order/OrderDetails.page';

export default function PurchaseDetailsPage(): ReactElement {
  const { purchase_id } = useParams();

  return <OrderDetailsPage moduleType={'purchase'} id={Number(purchase_id)} />;
}
