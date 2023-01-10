/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import { message } from 'antd';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import CouponForm from '../components/EventForm';
import QuizForm from '../components/QuizForm';
import CouponModule from '../Coupon.module';
import { CouponFormContext } from '../model/coupon-args.entity';
import { Coupon } from '../model/coupon.entity';

const CouponUpsert: FC<GlobalUpsertProps<Coupon>> = ({ onCallback, singleData }) => {
  const module = new CouponModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<CouponFormContext>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Coupon>) => {
    const { translate, couponCodes, productVariations, ...restValues } = formValues;

    if (restValues.available_until && restValues.release_date)
      if (new Date(restValues.available_until) < new Date(restValues.release_date)) {
        message.error(i18n.t('Coupon.WrongDateMsg'));
        return;
      }

    // NOTE: for now we send one code to API - for later maybe we have an array of codes. just change the values below + formContext model
    const codes = couponCodes?.map((coupon) => coupon.code);

    const values: Partial<CouponFormContext> = {
      ...restValues,
      available_until: restValues.available_until
        ? // Why 23:59:58? Cause in Antd Date Picker 23:59:59 is tomorrow.
          new Date(restValues.available_until).toISOString().split('T')[0] + ' 23:59:58 '
        : undefined,
      release_date: restValues.release_date
        ? new Date(restValues.release_date).toISOString().split('T')[0] + ' 00:00:00 '
        : undefined,
      codes: codes ? codes[0] : null,
      translate: normalizeTranslate(translate),
      product_variation_ids: productVariations?.map((variation) => variation.id),
    };

    mutate(
      {
        id: singleData ? singleData.id : undefined,
        values,
      },
      { onSuccess: onCallback },
    );
  };

  return <QuizForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default CouponUpsert;
