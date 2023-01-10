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

import AvailabilityModule from '../Availability.module';
import AvailabilityUpsert from '../containers/AvailabilityUpsert';
import { Availability } from '../model/Availability.entity';
import moduleInfo from '../ModuleInfo.json';
import { ApiBuilder } from '@src/shared/utils';
import { CompanyModel } from '@src/modules/Company/model/company.entity';

const AvailabilityUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { availability_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Availability);
  const [isLoading, setIsLoading] = useState(false);
  const availabilityModule = new AvailabilityModule();
  const title = availabilityModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...availabilityModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;
    const entity = 'http://88.198.95.174:2020/ClubAdmin/GetChantContent';
    const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';
  
    const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
    const  Api = new ApiBuilder<CompanyModel>(entity, title[0]);
    setIsLoading(true);
    const value = {
      id:+id,
      clubId:1,
      adminId:12
    }
    Api
      .createOne(value)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);
  const onUpdateData = (data) => {

    const entity = 'http://88.198.95.174:2020/ClubAdmin/GetChantContent';
    const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';
  
    const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
    const  Api = new ApiBuilder<CompanyModel>(entity, title[0]);
    let value;
    console.log('========data============================');
    console.log(data);
    console.log('=========data===========================');
    if(data){
       value = {
        id:data,
        clubId:1,
        adminId:12
      }
    }else{
       value = {
        id:+id,
        clubId:1,
        adminId:12
      }
    }
    
    Api
      .createOne(value)
      .then((data) => {
        setSingleData(data);
      })
     
  }
  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Availability> module={availabilityModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <AvailabilityUpsert onUpdate={onUpdateData} singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default AvailabilityUpsertPage;
