/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC, ReactElement } from 'react';
import { useMutation } from 'react-query';

import SettingForm from '../components/SettingForm';
import { Phones, Stock, StockFormCtx } from '../model';
import StockModule from '../Stock.module';

const SettingUpsert: FC<GlobalUpsertProps<Stock>> = ({ onCallback, singleData }): ReactElement => {
  const module = new StockModule();

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<StockFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Stock) => {
    const {
      email,
      fax,
      partner,
      countries,
      referrers,
      telephone,
      subdomains,
      warehouseRepair,
      contactGroup: { country, address, ...restContactGroup },
      ...restValues
    } = formValues;

    const phones: Phones[] = [];
    if (fax) phones.push({ type: 'fax', number: fax });
    if (telephone) phones.push({ type: 'phone', number: telephone });

    const values: StockFormCtx = {
      ...restValues,
      partner_id: partner?.id ?? undefined,
      country_ids: countries?.map((country) => country.id) ?? [],
      referrer_ids: referrers?.map((ref) => ref?.id) ?? undefined,
      subdomain_ids: subdomains?.map((sub) => sub?.id) ?? undefined,
      contactGroup: {
        ...restContactGroup,
        // NOTE: this is what backend asked for:
        addresses: [Object.assign(address, { title: 'warehouse' })],
        phones,
        emails: email ? [{ email }] : undefined,
        country_id: country?.id,
      },
      warehouse_repair_id: warehouseRepair?.id ?? null,
    };

    mutate({ id: singleData?.id ?? undefined, values }, { onSuccess: onCallback });
  };

  return <SettingForm onSubmit={handleFormSubmit} isPending={isLoading} initialValues={singleData} />;
};

export default SettingUpsert;
