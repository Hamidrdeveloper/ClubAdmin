import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import DownloadCategoryModule from '../Download.module';
import { DownloadCategoryModel } from '../model/DownloadCategory.entity';

export default function DownloadCategoryPage(): ReactElement {
  const module = new DownloadCategoryModule();

  return (
    <PageLayout<DownloadCategoryModel> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel defaultListView="longTiles">
        <Panel.Header hasSearch hasNew newLink="manage" noDescription />

        <Panel.ListView
          hasUpdate
          module={module}
          updateLink="manage"
          togglers={[{ dataIndex: 'is_active', title: i18n.t('Global.IsActive'), url: 'active' }]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
