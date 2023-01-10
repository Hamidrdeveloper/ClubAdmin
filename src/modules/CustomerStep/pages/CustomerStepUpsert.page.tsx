import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CustomerStepUpsert from '../container/CustomerStepUpsert';
import CustomerStepModule from '../CustomerStep.module';
import { CustomerStepModel } from '../model/CustomerStep.entity';
import moduleInfo from '../ModuleInfo.json';

const CustomerStepUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [singleData, setSingleData] = useState({} as CustomerStepModel);

  const [isLoading, setIsLoading] = useState(false);
  const customerStepModule = new CustomerStepModule();
  const title = customerStepModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...customerStepModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    customerStepModule.apiService
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
    <PageLayout<CustomerStepModel> module={customerStepModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <CustomerStepUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default CustomerStepUpsertPage;
