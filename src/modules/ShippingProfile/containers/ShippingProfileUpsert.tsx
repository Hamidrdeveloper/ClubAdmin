/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import ShippingProfileForm from '../components/ShippingProfileForm';
import {
  ShippingProfileCountryModel,
  ShippingProfileFormContext,
} from '../model/shippingProfile-args.entity';
import { ShippingProfile } from '../model/shippingProfile.entity';
import ShippingProfileModule from '../ShippingProfile.module';
import i18n from '@src/core/i18n/config';

const ShippingProfileUpsert: React.FC<GlobalUpsertProps<ShippingProfile>> = ({
  onCallback,
  closeModal,
  singleData,
  update
}) => {
  const module = new ShippingProfileModule();
  const entity = 'http://88.198.95.174:2020/ClubAdmin/AddBoard';
  const entityUpdate = 'http://88.198.95.174:2020/ClubAdmin/EditBoard';

  const title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  const  Api = new ApiBuilder<ShippingProfile>(entity, title[0]);
  const  ApiUpdate = new ApiBuilder<ShippingProfile>(entityUpdate, title[0]);

  const { mutate, isLoading } = useMutation(
    ({ id, values }: GlobalMutationProps<ShippingProfileFormContext>) => {
      console.log(values);
      console.log(id);
      return singleData?.id? ApiUpdate.createOne(values) : Api.createOne(values);
    },
  );

  const handleFormSubmit = (formValues: Partial<ShippingProfile>) => {
    const { partner, countries, subdomain } = formValues;

    // this is the model back wants us to send. :| -> what was wrong with country_ids? ¯\_(ツ)_/¯
    // Because later on, we need to send values of each country. but for now it is nullable
   
 


    let values: Partial<ShippingProfileFormContext> ;
    if( singleData.id){
      values = {
        ...formValues,
        adminId:12,
        clubId:1,
        boardId:singleData.id
      };
    }else{
      values = {
        ...formValues,
        adminId:12,
        clubId:1,
      };
    }
    mutate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: (data) => {
          onCallback?.(data);
          closeModal?.();
        },
      },
    );
  };

  return <ShippingProfileForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default ShippingProfileUpsert;
