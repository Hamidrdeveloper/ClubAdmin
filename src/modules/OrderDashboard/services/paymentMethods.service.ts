import { PaymentMethodPure } from '@modules/PaymentMethod';
import { ResponseContext } from '@shared/models';
import axios, { AxiosResponse } from 'axios';
export const getPaymentMethods = async (
  companyCountryId: number | undefined,
  companyCurrencyId: number | undefined,
): Promise<ResponseContext<PaymentMethodPure[]>> => {
  try {
    const response: AxiosResponse<ResponseContext<PaymentMethodPure[]>> = await axios.get(
      '/payment-methods?per_page=100',
      {
        params: { isActive: true, companyCountryId: companyCountryId, companyCurrencyId: companyCurrencyId },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
