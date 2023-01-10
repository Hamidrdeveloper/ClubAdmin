import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import TemplateUpsert from '../container/TemplateUpsert';
import EmailModule from '../Email.module';
import { EmailTemplates } from '../model/email.entity';
import { getOneTemplate } from '../services/email.service';

const NoticeTemplateUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { template_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as EmailTemplates);
  const [isLoading, setIsLoading] = useState(false);
  const emailModule = new EmailModule();
  const title = emailModule.title[0];

  const routes = [
    ...emailModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    getOneTemplate(Number(id))
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
    <PageLayout<EmailTemplates> module={emailModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={goBack} items={routes} />
          </div>
          {isLoading ? <Loader /> : <TemplateUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default NoticeTemplateUpsertPage;
