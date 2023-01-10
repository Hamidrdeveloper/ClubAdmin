import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import AddressForm from '../components/AddressForm';
import Fallback from '../components/Fallback';
import { Address, AddressFormCtx } from '../model/address';
import { AddressModule } from '../User.module';

interface Props extends GlobalUpsertProps<Address> {
  api?: (values: Partial<AddressFormCtx>) => void;
}

const AddressUpsert: FC<Props> = ({ api, onCallback, singleData }) => {
  const { user_id: id } = useParams();
  if (!id && !api) return <Fallback />;
  const module = new AddressModule(Number(id ?? 0));

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<AddressFormCtx>) => {
    if (api) {
      return api(values);
    } else return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Address>) => {
    // Since we don't need any changes in order to upsert, use AddressPure instead of its formCtx model
    const { country, websites, address, title, phones, emails, ...restValues } = formValues;

    // NOTE: Preventing to send undefined variables
    // keep phones if it has phone.type and phone.number
    const formattedPhones = phones?.filter((phone) => phone.type && phone.number);
    // if email exists
    const formattedEmails = emails?.filter((email) => email.email);
    // if website type exists
    const formattedWebsites = websites?.filter((website) => website.type);

    // Add 'http' if user didn't enter (backend will throw an exception on website url format)
    const validatedWebsites = formattedWebsites?.map(({ url, ...otherFields }) => {
      return { url: /^https?:\/\//.test(url) ? url : 'http://'.concat(url), ...otherFields };
    });

    // Remove Id's property from website email and phone, cause backend can't ignore it on update. #5682 (saving issue bug)
    formattedPhones?.forEach((phone) => {
      delete phone['id'];
    });
    formattedEmails?.forEach((email) => {
      delete email['id'];
    });
    validatedWebsites?.forEach((site) => {
      delete site['id'];
    });

    const values: Partial<AddressFormCtx> = {
      ...restValues,
      phones: formattedPhones,
      emails: formattedEmails,
      country_id: country?.id,
      websites: validatedWebsites,
      user_id: id ? Number(id) : undefined,
      addresses: address ? [address] : undefined,
      translate: title ? { de: { locale: 'de', title } } : {},
    };

    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <AddressForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default AddressUpsert;
