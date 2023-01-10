import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import FlagModule from '../Flag.module';
import { Flag } from '../model/flag.entity';

export default function FlagPage(): ReactElement {
  const flagModule = new FlagModule();

  return (
    <PageLayout<Flag> module={flagModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch />

        <Panel.ListView module={flagModule} tableScroll={{ x: 2000, y: 475 }} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
