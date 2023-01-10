import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Package } from '../model/package.entity';
import PackageModule from '../Package.module';

export default function PackagePage(): ReactElement {
  const packageModule = new PackageModule();

  return (
    <PageLayout<Package> module={packageModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch hasDelete />

        <Panel.ListView tableScroll={{ x: 992, y: 475 }} module={packageModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
