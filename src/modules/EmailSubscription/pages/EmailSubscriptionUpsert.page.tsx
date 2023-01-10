import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import EmailSubscriptionUpsert from '../container/EmailSubscriptionUpsert';
import EmailSubscriptionModule from '../EmailSubscription.module';
import { EmailSubscriptionModel } from '../model/emailSubscription.entity';
import moduleInfo from '../ModuleInfo.json';

const EmailSubscriptionUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { email_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as EmailSubscriptionModel);
  const [isLoading, setIsLoading] = useState(true);
  const module = new EmailSubscriptionModule();
  const title = module.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...module.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    module.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<EmailSubscriptionModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <EmailSubscriptionUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default EmailSubscriptionUpsertPage;
