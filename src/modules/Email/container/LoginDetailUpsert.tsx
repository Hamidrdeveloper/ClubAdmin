import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import LoginDetailForm from '../components/LoginDetailForm';
import { LoginDetail, LoginDetailContext } from '../model/email.entity';
import { updateLoginDetail } from '../services/email.service';

const LoginDetailUpsert: React.FC<GlobalUpsertProps<LoginDetailContext>> = ({ singleData }) => {
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<LoginDetail>) =>
    updateLoginDetail(values),
  );

  const handleSubmit = (values: LoginDetailContext) => {
    const finalValues: LoginDetail = {
      partner_id: null,
      slug: 'email-authorization',
      data: { ...values, mode: String(values.mode) },
    };
    mutate({ values: finalValues });
  };
  return <LoginDetailForm isPending={isLoading} initialValues={singleData} onSubmit={handleSubmit} />;
};

export default LoginDetailUpsert;
