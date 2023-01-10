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
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PriceTypeUpsert from '../containers/PriceTypeUpsert';
import { PriceType } from '../model/priceType.entity';
import moduleInfo from '../ModuleInfo.json';
import PriceTypeModule from '../PriceType.module';
import moment from 'moment';

const PriceTypeUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { priceType_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as PriceType);
  const [isLoading, setIsLoading] = useState(false);
  const priceTypeModule = new PriceTypeModule();
  const title = priceTypeModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...priceTypeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `Updata ${title} - ${id}` : `New ${title}`,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (!id) return;

    const value ={
      ...location.state.data,
      startTime: moment(location.state.data.startTime),
      endTime:  moment(location.state.data.endTime),
      guestTeamId:location.state.data.guestTeam.id,
      hostTeamId:location.state.data.hostTeam.id,
      file:location.state.data.logoUrl
    }
    setSingleData(value);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<PriceType> module={priceTypeModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <PriceTypeUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default PriceTypeUpsertPage;
