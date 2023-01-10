import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PaymentTermUpsert from '../containers/PaymentTermUpsert';
import { PaymentTerm } from '../model/paymentTerm.entity';
import moduleInfo from '../ModuleInfo.json';
import PaymentTermModule from '../PaymentTerm.module';

const PaymentTermUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { paymentTerm_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as PaymentTerm);
  const [isLoading, setIsLoading] = useState(false);
  const paymentTermModule = new PaymentTermModule();
  const title = paymentTermModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...paymentTermModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    paymentTermModule.apiService
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
    <PageLayout<PaymentTerm> module={paymentTermModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PaymentTermUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PaymentTermUpsertPage;
