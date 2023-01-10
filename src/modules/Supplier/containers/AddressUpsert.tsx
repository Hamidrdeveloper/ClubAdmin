import AddressForm from '@src/modules/User/components/AddressForm';
import { Address, AddressFormCtx } from '@src/modules/User/model/address';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import Fallback from '../components/Fallback';
import { AddressModule } from '../Supplier.module';

const AddressUpsert: FC<GlobalUpsertProps<Address>> = ({ onCallback, singleData }) => {
  const { supplier_id: id } = useParams();
  if (!id) return <Fallback />;
  const module = new AddressModule(id);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<AddressFormCtx>) => {
    return id
      ? module.apiService.request({ url: `contact-groups/${id}`, method: 'PUT', body: values })
      : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Address>) => {
    // Since we don't need any changes in order to upsert, use AddressPure instead of its formCtx model
    const { country, websites, address, title, ...restValues } = formValues;

    // Add 'http' if user didn't enter (backend will throw an exception on website url format)
    const formattedWebsites = websites?.map(({ url, ...otherFields }) => {
      return { url: /^https?:\/\//.test(url) ? url : 'http://'.concat(url), ...otherFields };
    });

    const values: Partial<AddressFormCtx> = {
      ...restValues,
      addresses: address ? [address] : undefined,
      country_id: country?.id,
      websites: formattedWebsites,
      translate: title ? { de: { locale: 'de', title } } : {},
    };

    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <AddressForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default AddressUpsert;
