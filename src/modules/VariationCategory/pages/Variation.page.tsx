import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { VariationCategory } from '../model/variationCategory.entity';
import VariationCategoryModule from '../VariationCategory.module';

export default function VariationCategoryPage(): ReactElement {
  const variationCategroyModule = new VariationCategoryModule();

  return (
    <PageLayout<VariationCategory> module={variationCategroyModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch newLink="" />
        <Panel.ListView module={variationCategroyModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
