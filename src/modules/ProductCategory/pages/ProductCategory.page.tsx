import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { ProductCategory } from '../model/productCategory.entity';
import ProductCategoryModule from '../ProductCategory.module';

export default function ProductCategoryPage(): ReactElement {
  const productCategoryModule = new ProductCategoryModule();

  return (
    <PageLayout<ProductCategory> module={productCategoryModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasDelete hasSearch />

        <Panel.ListView
          module={productCategoryModule}
          tableScroll={{ x: 992, y: 475 }}
          togglers={[
            {
              url: 'show-in-website',
              dataIndex: 'show_in_website',
              title: i18n.t('ProductCategory.Field.ShowInWebsite'),
            },
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
