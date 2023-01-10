/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PaymentMethodUpsert from '../containers/PaymentMethodUpsert';
import { PaymentMethod } from '../model/paymentMethod.entity';
import moduleInfo from '../ModuleInfo.json';
import PaymentMethodModule from '../PaymentMethod.module';
import { ApiBuilder } from '@src/shared/utils';
import { useLocation } from 'react-router-dom';
const PaymentMethodUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log('=============location=======================');
  console.log(location);
  console.log('=============location=======================');
  const { paymentMethod_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as PaymentMethod);
  const [isLoading, setIsLoading] = useState(false);
  const paymentMethodModule = new PaymentMethodModule();
  const title = paymentMethodModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...paymentMethodModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    const value ={
      ...location.state.data,
      file:location.state.data.logoUrl,
    }
    setSingleData(value);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<PaymentMethod> module={paymentMethodModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PaymentMethodUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PaymentMethodUpsertPage;
