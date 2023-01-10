import { FormProps } from '@src/shared/models';
import { Tabs } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SubdomainForm from '../components/Subdomain.form';
import { Subdomain } from '../model/Subdomain.entity';
import SubdomainAnalyticTags from './Tabs/AnalyticTags.tab';
import SubdomainPartner from './Tabs/Partner.tab';
//import SubdomainSaleSystem from './Tabs/SaleSystem.tab';
import SubdomainSocialMedia from './Tabs/SocialMedia.tab';

const { TabPane } = Tabs;

type Props = { formProps: FormProps<Subdomain>; subdomainId: number; partnerId: number };
const SubdomainTabs = ({ formProps, subdomainId, partnerId }: Props): ReactElement => {
  const { company_id: companyId } = useParams();

  const companyIdNumber: number | undefined = companyId ? Number(companyId) : undefined;
  const { t } = useTranslation();

  return (
    <Tabs defaultActiveKey="subdomain">
      <TabPane
        children={<SubdomainForm {...formProps} />}
        tab={<span>{t('Subdomain.Tabs.Subdomain')}</span>}
        key="subdomain"
      />

      {/* <TabPane
        children={
          <SubdomainSaleSystem partnerId={partnerId} subdomainId={subdomainId} companyId={companyIdNumber} />
        }
        tab={<span>{t('Subdomain.Tabs.SaleSystem')}</span>}
        key="sale-system"
      /> */}

      <TabPane
        children={
          <SubdomainAnalyticTags
            partnerId={partnerId}
            subdomainId={subdomainId}
            companyId={companyIdNumber}
            analyticTagsData={
              formProps?.initialValues?._data?.analytic_tag ?? [
                { locale: null, google: '', 'microsoft-uet': '' },
              ]
            }
          />
        }
        tab={<span>{t('Subdomain.Tabs.AnalyticTag')}</span>}
        key="analytic"
      />

      <TabPane
        children={
          <SubdomainSocialMedia
            socialMediaData={
              formProps?.initialValues?._data?.social_media ?? [{ name: '', url: '', icon_url: '' }]
            }
            partnerId={partnerId}
            subdomainId={subdomainId}
            companyId={companyIdNumber}
          />
        }
        tab={<span>{t('Subdomain.Tabs.SocialMedia')}</span>}
        key="social-media"
      />

      <TabPane
        children={
          <SubdomainPartner
            partnerData={formProps?.initialValues?._data?.partner ?? undefined}
            partnerId={partnerId}
            subdomainId={subdomainId}
            companyId={companyIdNumber}
          />
        }
        tab={<span>{t('Subdomain.Tabs.Partner')}</span>}
        key="partner"
      />
    </Tabs>
  );
};

export default SubdomainTabs;
