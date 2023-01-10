import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import EmailSubscriptionForm from '../component/EmailSubscriptionForm';
import EmailSubscriptionModule from '../EmailSubscription.module';
import { EmailSubscriptionModel } from '../model/emailSubscription.entity';

function EmailSubscriptionUpsert({
  onCallback,
  singleData,
}: GlobalUpsertProps<EmailSubscriptionModel>): ReactElement {
  const module = new EmailSubscriptionModule();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<EmailSubscriptionModel>) => {
    return module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<EmailSubscriptionModel>) => {
    mutate(
      { values: formValues },
      {
        onSuccess: (data) => {
          onCallback?.(data);
        },
      },
    );
  };

  return (
    <EmailSubscriptionForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
}

export default EmailSubscriptionUpsert;
