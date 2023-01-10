// @ts-nocheck
import { Partner } from '@src/modules/Partner';
import { PartnerFormContext } from '@src/modules/Partner/model';
import PartnerModule from '@src/modules/Partner/Partner.module';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import PartnerForm from '../components/PartnerForm';

const PartnerUpsert: React.FC<GlobalUpsertProps<Partner> & { userId: number; sponsorId?: number }> = ({
  userId,
  sponsorId,
  onCallback,
  singleData,
}) => {
  const navigate = useNavigate();
  const module = new PartnerModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Partner>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Partner>) => {
    const { coach, user, translate, company, ...restValues } = formValues;

    const values: Partial<PartnerFormContext> = {
      ...restValues,
      user,
      user_id: userId,
      coach_id: coach?.id,
      parent_id: sponsorId,
      career_step_id: user?.careerStep?.id,
      company_id: company?.id ?? null,
      translate: normalizeTranslate(translate),
      post_delivery_factor: restValues.post_delivery_factor || false,
    };

    mutate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: () => {
          onCallback;
          navigate(-1);
        },
      },
    );
  };

  return <PartnerForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PartnerUpsert;
