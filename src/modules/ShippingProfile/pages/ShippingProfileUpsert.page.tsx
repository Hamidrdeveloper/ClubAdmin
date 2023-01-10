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
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ShippingProfileUpsert from '../containers/ShippingProfileUpsert';
import { ShippingProfile } from '../model/shippingProfile.entity';
import moduleInfo from '../ModuleInfo.json';
import ShippingProfileModule from '../ShippingProfile.module';

const ShippingProfileUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { shippingProfile_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as ShippingProfile);
  const [isLoading, setIsLoading] = useState(false);
  const shippingProfileModule = new ShippingProfileModule();
  const title = shippingProfileModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...shippingProfileModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  const location = useLocation();

  useEffect(() => {
    if (!id) return;

    const value ={
      ...location.state.data,
      file:location.state.data.pictureUrl
    }
    setSingleData(value);
  }, []);


  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<ShippingProfile> module={shippingProfileModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <ShippingProfileUpsert  singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default ShippingProfileUpsertPage;
