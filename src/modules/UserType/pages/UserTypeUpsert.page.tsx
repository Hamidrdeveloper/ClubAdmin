import i18n from '@src/core/i18n/config';
import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import UserTypeUpsert from '../containers/UserTypeUpsert';
import { UserType } from '../model/userType.entity';
import moduleInfo from '../ModuleInfo.json';
import UserTypeModule from '../UserType.module';

const UserTypeUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { userType_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as UserType);
  const userTypeModule = new UserTypeModule();
  const title = userTypeModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...userTypeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (id) {
      userTypeModule.apiService.getOne(+id).then((data) => {
        setSingleData(data);
      });
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <PageLayout<UserType> module={userTypeModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          <UserTypeUpsert singleData={singleData} onCallback={goBack} />
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default UserTypeUpsertPage;
