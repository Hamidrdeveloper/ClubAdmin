import i18n from '@src/core/i18n/config';
import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StatusUpsert from '../containers/StatusUpsert';
import { Status } from '../model/status.entity';
import moduleInfo from '../ModuleInfo.json';
import StatusModule from '../Status.module';

const StatusUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { status_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Status);
  const statusModule = new StatusModule();
  const title = statusModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...statusModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (id) {
      statusModule.apiService.getOne(+id).then((data) => {
        setSingleData(data);
      });
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Status> module={statusModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          <StatusUpsert singleData={singleData} onCallback={goBack} />
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default StatusUpsertPage;
