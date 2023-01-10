import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import LanguageModule from '../Language.module';
import { Language } from '../model/language.entity';

function LanguagePage(): ReactElement {
  const languageModule = new LanguageModule();

  return (
    <PageLayout<Language> module={languageModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          hasActive
          hasDefault
          hasUpdate={false}
          togglers={[{ title: i18n.t('Language.Field.IsLtr'), url: 'is-ltr', dataIndex: 'is_ltr' }]}
          params={{ orderBy: { is_active: 'DESC' } }}
          module={languageModule}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}

export default LanguagePage;
