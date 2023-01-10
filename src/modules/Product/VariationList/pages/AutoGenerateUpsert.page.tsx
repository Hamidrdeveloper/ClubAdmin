import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoGenerateUpsert from '../containers/AutoGenerateUpsert';

const AutoGenerateVariationPage = (): ReactElement => {
  const navigate = useNavigate();

  const title = 'Auto Generate Variation';

  const routes = [
    {
      path: '',
      breadcrumbName: title,
    },
  ];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(-1)} items={routes} />
          </div>
          <AutoGenerateUpsert onCallback={goBack} />
        </UpsertWrapper>
      </PageLayout.Panel>
    </>
  );
};

export default AutoGenerateVariationPage;
