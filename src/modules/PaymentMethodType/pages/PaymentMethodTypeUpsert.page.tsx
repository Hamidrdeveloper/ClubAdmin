import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PaymentMethodTypeUpsert from '../containers/PaymentMethodTypeUpsert';
import { PaymentMethodType } from '../model/paymentMethodType.entity';
import moduleInfo from '../ModuleInfo.json';
import PaymentMethodTypeModule from '../PaymentMethodType.module';

const PaymentMethodTypeUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { paymentMethodType_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as PaymentMethodType);
  const [isLoading, setIsLoading] = useState(false);
  const paymentMethodTypeModule = new PaymentMethodTypeModule();
  const title = paymentMethodTypeModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...paymentMethodTypeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    paymentMethodTypeModule.apiService
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
    <PageLayout<PaymentMethodType> module={paymentMethodTypeModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PaymentMethodTypeUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PaymentMethodTypeUpsertPage;
