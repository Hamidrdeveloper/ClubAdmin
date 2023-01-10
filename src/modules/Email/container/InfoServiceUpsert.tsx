import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import InfoServiceForm from '../components/InfoServiceForm';
import { InfoService, InfoServiceContext } from '../model/email.entity';
import { updateInfoService } from '../services/email.service';

const InfoServiceUpsert: React.FC<GlobalUpsertProps<InfoServiceContext>> = ({ singleData }) => {
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<InfoService>) =>
    updateInfoService(values),
  );

  const handleSubmit = (values: InfoServiceContext) => {
    const { bcc, send_email_after_new_order } = values;

    const finalValues: InfoService = {
      partner_id: null,
      slug: 'bcc-setting',
      data: {
        ...values,
        bcc: bcc === 'true',
        send_email_after_new_order: send_email_after_new_order === 'true',
      },
    };
    mutate({ values: finalValues });
  };
  return <InfoServiceForm isPending={isLoading} initialValues={singleData} onSubmit={handleSubmit} />;
};

export default InfoServiceUpsert;
