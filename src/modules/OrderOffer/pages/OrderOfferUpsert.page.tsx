import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import OrderOfferUpsert from '../containers/OrderOfferUpsert';
import { OrderOffer } from '../model/orderOffer.entity';
import moduleInfo from '../ModuleInfo.json';
import OrderOfferModule from '../OrderOffer.module';

const OrderOfferUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { orderOffer_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as OrderOffer);
  const [isLoading, setIsLoading] = useState(false);
  const orderOfferModule = new OrderOfferModule();
  const title = orderOfferModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...orderOfferModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    orderOfferModule.apiService
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
    <PageLayout<OrderOffer> module={orderOfferModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <OrderOfferUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default OrderOfferUpsertPage;
