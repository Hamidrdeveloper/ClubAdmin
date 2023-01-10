import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import AdditionalBonusModule from '../AdditionalBonus.module';
import AdditionalBonusUpsert from '../containers/AdditionalBonusUpsert';
import { AdditionalBonus } from '../model/additionalBonus.entity';
import moduleInfo from '../ModuleInfo.json';

const AdditionalBonusUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { additionalBonus_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as AdditionalBonus);
  const [isLoading, setIsLoading] = useState(false);
  const additionalBonusModule = new AdditionalBonusModule();
  const title = additionalBonusModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...additionalBonusModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    additionalBonusModule.apiService
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
    <PageLayout<AdditionalBonus> module={additionalBonusModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <AdditionalBonusUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default AdditionalBonusUpsertPage;
