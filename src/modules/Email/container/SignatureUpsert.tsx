import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import SignatureForm from '../components/SignatureForm';
import { Signature, SignatureContext } from '../model/email.entity';
import { updateSignature } from '../services/email.service';

const SignatureUpsert: React.FC<GlobalUpsertProps<SignatureContext>> = ({ singleData }) => {
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<Signature>) =>
    updateSignature(values),
  );

  const handleSubmit = (values: SignatureContext) => {
    const finalValues: Signature = {
      partner_id: null,
      slug: 'mail-signatures',
      data: [{ locale: 'en', html: values.html, plain: values.plain }],
    };
    mutate({ values: finalValues });
  };
  return <SignatureForm isPending={isLoading} initialValues={singleData} onSubmit={handleSubmit} />;
};

export default SignatureUpsert;
