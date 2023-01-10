import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SpecialConditionCareerStepUpsert from '../container/SpecialConditionCareerStepUpsert';
import { SpecialConditionCareerStepModel } from '../model/SpecialConditionCareerStep.entity';
import moduleInfo from '../ModuleInfo.json';
import SpecialConditionCareerStepModule from '../SpecialConditionCareerStep.module';

const SpecialConditionCareerStepUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { special_condition_career_step_id: id } = useParams();
  const [singleData, setSingleData] = useState<SpecialConditionCareerStepModel>();
  const [isLoading, setIsLoading] = useState(true);
  const module = new SpecialConditionCareerStepModule();
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
    <PageLayout<SpecialConditionCareerStepModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <SpecialConditionCareerStepUpsert singleData={singleData} onCallback={goBack} />
          )}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default SpecialConditionCareerStepUpsertPage;
