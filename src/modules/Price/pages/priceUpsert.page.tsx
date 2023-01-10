import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import PriceUpsert from '../containers/PriceUpsert';
import { Price } from '../model/price.entity';
import moduleInfo from '../ModuleInfo.json';
import PriceModule from '../Price.module';

const PriceUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { price_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Price);
  const [isLoading, setIsLoading] = useState(false);
  const priceModule = new PriceModule();
  const title = priceModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...priceModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `Updata ${title} - ${id}` : `New ${title}`,
    },
  ];

  useEffect(() => {
    function getData() {
      if (!id) return;

      setIsLoading(true);
      priceModule.apiService
        .getOne(+id)
        .then((data) => {
          setSingleData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    getData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Price> module={priceModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PriceUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PriceUpsertPage;
