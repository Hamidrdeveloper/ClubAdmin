import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CouponModule from '../Coupon.module';
import { Coupon } from '../model/coupon.entity';

export default function CouponPage(): ReactElement {
  const couponModule = new CouponModule();

  return (
    <PageLayout<Coupon> module={couponModule}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView hasActive module={couponModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
