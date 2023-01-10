import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import NumberSeriesUpsert from '../containers/NumberSeriesUpsert';
import { NumberSeries } from '../model/numberSeries.entity';
import moduleInfo from '../ModuleInfo.json';
import NumberSeriesModule from '../NumberSeries.module';

const NumberSeriesUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { numberseries_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as NumberSeries);
  const [isLoading, setIsLoading] = useState(false);
  const numberSeriesModule = new NumberSeriesModule();
  const title = numberSeriesModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...numberSeriesModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    numberSeriesModule.apiService
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
    <PageLayout<NumberSeries> module={numberSeriesModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <NumberSeriesUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default NumberSeriesUpsertPage;
