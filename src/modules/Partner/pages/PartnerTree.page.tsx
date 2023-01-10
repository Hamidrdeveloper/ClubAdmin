import { PageLayout } from '@src/shared/components';
import React from 'react';

import PartnerGraph from '../containers/PartnerGraph';
import { Partner } from '../model/partner.entity';
import PartnerModule from '../Partner.module';

const PartnerTree: React.FC = () => {
  const partnerModule = new PartnerModule();

  return (
    <PageLayout<Partner> module={partnerModule}>
      <PageLayout.Breadcrumb
        routes={[...(partnerModule.breadcrumbItems || []), { path: '', breadcrumbName: 'Partner Tree' }]}
      />

      <PartnerGraph />
    </PageLayout>
  );
};

export default PartnerTree;
