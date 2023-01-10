import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import OrderDetailsPage from '../Order/OrderDetails.page';

export default function PartnerDetailsPage(): ReactElement {
  const { partner_id } = useParams();

  return <OrderDetailsPage moduleType={'partner'} id={Number(partner_id)} />;
}
