import i18n from '@src/core/i18n/config';
import { Loader, ModalHeader, PageLayout } from '@src/shared/components';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DocumentSettingsUpsert from '../container/DocumentSettings.upsert';
import DocumentSettingsModule from '../DocumentSettings.module';
import { DocumentSettingsModel } from '../model/DocumentSettings.entity';
import moduleInfo from '../ModuleInfo.json';
import { getSingleDocumentSettings } from '../services/documentSettings';

const DocumentSettingsUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { document_settings_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as DocumentSettingsModel);
  const [isLoading, setIsLoading] = useState(true);
  const module = new DocumentSettingsModule();
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

    getSingleDocumentSettings(+id)
      .then((resp) => {
        setSingleData(resp);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<DocumentSettingsModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <DocumentSettingsUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default DocumentSettingsUpsertPage;
