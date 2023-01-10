import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailsPage from '../Order/OrderDetails.page';

export default function CreditDetailsPage(): ReactElement {
  const { credit_id } = useParams();

  return <OrderDetailsPage moduleType={'credit'} id={Number(credit_id)} />;
}
