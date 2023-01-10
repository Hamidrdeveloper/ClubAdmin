import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Product } from '../model/Product.entity';
import ProductModule from '../Product.module';

export default function ProductPage(): ReactElement {
  const productModule = new ProductModule();

  return (
    <PageLayout<Product> module={productModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch newLink="manage" />

        <Panel.ListView
          hasActive
          updateLink="manage"
          module={productModule}
          tableScroll={{ y: 640, x: 1300 }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
