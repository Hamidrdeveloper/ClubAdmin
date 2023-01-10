/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { User } from '@src/modules/User';
import useFetchedQueryData from '@src/shared/hooks/useFetchedQueryData';
import { GlobalMutationProps } from '@src/shared/models';
import { notification } from 'antd';
import axios from 'axios';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import PartnerSubdomainForm from '../components/PartnerSubdomain.form';
import { Subdomain, SubdomainContext } from '../model/Subdomain.entity';
import PartnerSubdomainModule from '../PartnerSubdomain.module';
import SubdomainTabs from './Subdomain.tabs';

interface Props {
  setModalVisible: (isModalVisible: boolean) => void;
  setCanCreateNew: (canCreateNew: boolean) => void;
  subdomainId: number | undefined;
}
const PartnerSubdomainUpsert = ({ setModalVisible, subdomainId, setCanCreateNew }: Props): ReactElement => {
  const module = new PartnerSubdomainModule();
  const [subdomainData, setSubdomainData] = useState<Subdomain>({} as Subdomain);
  const { user_id: id } = useParams();
  useEffect(() => {
    if (subdomainId) {
      axios
        .get<{ data: Subdomain }>(`/subdomains/${subdomainId}`)
        .then((response) => {
          setSubdomainData(response?.data?.data);
        })
        .catch((error) => {
          notification.error(error.message);
        });
    }
    return () => {
      setSubdomainData({} as Subdomain);
    };
  }, []);
  const userData = useFetchedQueryData<User>({ queryKey: `user-${id}` });

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Subdomain>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Subdomain>) => {
    const { partner, paymentMethods, ...restFormValues } = formValues;

    const values: Partial<SubdomainContext> = {
      ...restFormValues,
      partner_id: partner?.id,
      payment_method_ids: paymentMethods?.map((paymentMethod) => paymentMethod.id) ?? null,
    };

    mutate(
      { id: subdomainData ? subdomainData.id : undefined, values },
      {
        onSuccess: () => {
          setModalVisible(false);
          if (!subdomainId) {
            setCanCreateNew(false);
          }
        },
      },
    );
  };

  const isSubdomainUpdate = useMemo(() => {
    return subdomainData ? Object.keys(subdomainData).length > 0 : false;
  }, [subdomainData]);

  if (isSubdomainUpdate) {
    return (
      <SubdomainTabs
        formProps={{ isPending: isLoading, onSubmit: handleFormSubmit, initialValues: subdomainData }}
        subdomainId={subdomainData!.id}
        partnerId={subdomainData!.partner_id}
      />
    );
  } else {
    return (
      <PartnerSubdomainForm
        isPending={isLoading}
        onSubmit={handleFormSubmit}
        partnerData={userData?.partner}
      />
    );
  }
};

export default PartnerSubdomainUpsert;
