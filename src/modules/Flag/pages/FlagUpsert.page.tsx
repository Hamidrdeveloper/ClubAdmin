import i18n from '@src/core/i18n/config';
import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import FlagUpsert from '../containers/FlagUpsert';
import FlagModule from '../Flag.module';
import { Flag } from '../model/flag.entity';
import moduleInfo from '../ModuleInfo.json';

const FlagUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { flag_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Flag);
  const flagModule = new FlagModule();
  const title = flagModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...flagModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (id) {
      flagModule.apiService.getOne(+id).then((data) => {
        setSingleData(data);
      });
    }
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Flag> module={flagModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          <FlagUpsert singleData={singleData} onCallback={goBack} />
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default FlagUpsertPage;
