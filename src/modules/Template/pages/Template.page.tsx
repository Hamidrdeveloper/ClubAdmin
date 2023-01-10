import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { Template } from '../model/template.entity';
import TemplateModule from '../Template.Module';

export default function TemplatePage(): ReactElement {
  const templateModule = new TemplateModule();

  return (
    <PageLayout<Template> module={templateModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView tableScroll={{ x: 1450, y: 475 }} module={templateModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
