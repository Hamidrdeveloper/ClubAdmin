import CompanyForm from '@src/modules/Company/components/CompanyForm';
import { CompanyFormCtx, CompanyModel } from '@src/modules/Company/model/company.entity';
import { GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import {
  createCompanyByPartnerService,
  updateCompanyByPartnerService,
} from '../services/createCompanyByPartner.service';

interface props extends GlobalUpsertProps<CompanyModel> {
  partnerId: number | undefined;
  isCreateByPartner?: boolean;
}

type mutationProps = {
  id?: number;
  values: CompanyFormCtx;
};

const CompanyInsertFromPartnerID = ({
  partnerId,
  singleData,
  onCallback,
  isCreateByPartner,
}: props): ReactElement => {
  const { mutate, isLoading } = useMutation(({ id, values }: mutationProps) => {
    return id ? updateCompanyByPartnerService(values, id) : createCompanyByPartnerService(values);
  });

  if (!partnerId) return <Fallback />;

  const formSubmitHandler = (formValues: CompanyModel): void => {
    const { countries, currencies, contactGroup, ...restValues } = formValues;
    const values: CompanyFormCtx = {
      ...restValues,
      partner_id: partnerId,
      contact_group_id: contactGroup?.id,
      country_ids: countries?.map((country) => country.id),
      currency_ids: currencies?.map((currency) => currency.id),
    };

    mutate({ id: singleData?.id, values }, { onSuccess: onCallback });
  };

  return (
    <CompanyForm
      isCreateByPartner={isCreateByPartner}
      isPending={isLoading}
      initialValues={singleData}
      onSubmit={formSubmitHandler}
    />
  );
};

export default CompanyInsertFromPartnerID;
