import i18n from '@src/core/i18n/config';
import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ExportTypeEdit from '../container/ExportTypeEdit';
import ExportTypeModule from '../ExportType.module';
import { ExportTypeModel } from '../model/ExportsTypes.entity';
import moduleInfo from '../ModuleInfo.json';

const ExportTypeEditPage = (): ReactElement => {
  const navigate = useNavigate();
  const { export_type_id: id } = useParams();

  const [singleData, setSingleData] = useState({} as ExportTypeModel);
  const module = new ExportTypeModule();
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
    if (id) {
      module.apiService.getOne(+id).then((data) => {
        setSingleData(data);
      });
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<ExportTypeModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          <ExportTypeEdit singleData={singleData} onCallback={goBack} />
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default ExportTypeEditPage;
