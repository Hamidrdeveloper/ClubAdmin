import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CareerStepModule from '../CareerStep.module';
import CareerStepUpsert from '../container/CareerStepUpsert';
import { CareerStep } from '../model/careerstep.entity';
import moduleInfo from '../ModuleInfo.json';

const CareerStepUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { careerstep_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as CareerStep);

  const [isLoading, setIsLoading] = useState(false);
  const CareerstepModule = new CareerStepModule();
  const title = CareerstepModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...CareerstepModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    CareerstepModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<CareerStep> module={CareerstepModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin/${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <CareerStepUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default CareerStepUpsertPage;
