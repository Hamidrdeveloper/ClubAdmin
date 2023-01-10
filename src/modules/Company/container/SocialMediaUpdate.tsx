import i18n from '@src/core/i18n/config';
import { SocialMediaForm } from '@src/modules/ShopSettings/components/SocialMedia.form';
import { Loader } from '@src/shared/components';
import { message } from 'antd';
import React, { ReactElement } from 'react';
import { useMutation, useQuery } from 'react-query';

import { SocialMediaFullModel, SocialMediaModel } from '../model/socialMedia.entity';
import {
  getSocialMediaSettingsViaCompanyId,
  updateSocialMediaSettings,
} from '../services/socialMedia.service';

type Props = { companyId: number | string };

const SocialMediaUpdate = ({ companyId }: Props): ReactElement => {
  const { data, isFetching } = useQuery<SocialMediaFullModel>(
    ['socialMediaSettings-companyId', companyId],
    getSocialMediaSettingsViaCompanyId.bind(null, companyId),
  );

  const { mutate, isLoading } = useMutation(updateSocialMediaSettings);

  const handleFormSubmit = (formValues: SocialMediaModel[]) => {
    if (!data) return;

    const values: SocialMediaFullModel = {
      ...data,
      data: { ...formValues },
      company_id: +companyId,
    };

    mutate(values, {
      onSuccess: () => {
        message.success(i18n.t('Company.SuccessfullyUpdated'));
      },
    });
  };

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <SocialMediaForm initialValues={data?.data ?? []} onSubmit={handleFormSubmit} isPending={isLoading} />
      )}
    </>
  );
};

export default SocialMediaUpdate;
