import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import NewsLetterForm from '../components/NewsLetterForm';
import { NewsLetter, NewsLetterContext } from '../model/email.entity';
import { updateNewsLetter } from '../services/email.service';

const NewsLetterUpsert: React.FC<GlobalUpsertProps<NewsLetterContext>> = ({ singleData }) => {
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<NewsLetter>) =>
    updateNewsLetter(values),
  );

  const handleSubmit = (values: NewsLetterContext) => {
    const finalValues: NewsLetter = {
      data: { ...values, mode: String(values.mode) },
      partner_id: null,
      slug: 'newsletter-authorization',
    };
    mutate({ values: finalValues });
  };
  return <NewsLetterForm isPending={isLoading} initialValues={singleData} onSubmit={handleSubmit} />;
};

export default NewsLetterUpsert;
