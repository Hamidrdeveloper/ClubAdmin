import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CountryModule from '../Country.module';
import { Country } from '../model/country.entity';

export default function CountryPage(): ReactElement {
  const countryModule = new CountryModule();

  return (
    <PageLayout<Country> module={countryModule}>
      <PageLayout.Breadcrumb />
      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          hasActive
          hasDefault
          module={countryModule}
          tableScroll={{ x: 1450, y: 475 }}
          togglers={[{ url: 'eeu-status', title: i18n.t('Global.IsEeu'), dataIndex: 'is_eeu' }]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
