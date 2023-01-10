import axios, { AxiosResponse } from 'axios';

import { Address, SetAsInvoiceModel } from '../model/address';
import { AddressModule } from '../User.module';

export const setAsInvoice = async ({
  userId,
  contact_group_id: id,
}: {
  userId: number;
  contact_group_id: number;
}): Promise<Partial<SetAsInvoiceModel>> => {
  try {
    const response: AxiosResponse<{ data: SetAsInvoiceModel }> = await axios.put(
      `users/${userId}/invoice-contact-group`,
      {
        invoice_contact_group_id: id,
      },
      // NOTE: only accept requests with status code of 200
      // NOTE: 204 means that this invoice doesn't belong to us
      {
        validateStatus: (status) => status === 200,
      },
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getMainAddress = async ({
  userId,
  invoiceContactGroupId,
}: {
  userId: number;
  invoiceContactGroupId: number;
}): Promise<string> => {
  const addressModule = new AddressModule(userId);
  try {
    const response: Address = await addressModule.apiService.getOne(invoiceContactGroupId);

    const result = response.address?.address_complete ?? '-';

    return result;
  } catch (e) {
    throw new Error(e);
  }
};
