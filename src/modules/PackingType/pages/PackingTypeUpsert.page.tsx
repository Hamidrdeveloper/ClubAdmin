import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PackingTypeUpsert from '../containers/PackingTypeUpsert';
import { PackingType } from '../model/packingType.entity';
import moduleInfo from '../ModuleInfo.json';
import PackingTypeModule from '../PackingType.module';

const PackingTypeUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { packingType_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as PackingType);
  const [isLoading, setIsLoading] = useState(false);
  const packingTypeModule = new PackingTypeModule();
  const title = packingTypeModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...packingTypeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    packingTypeModule.apiService
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
    <PageLayout<PackingType> module={packingTypeModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PackingTypeUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PackingTypeUpsertPage;
