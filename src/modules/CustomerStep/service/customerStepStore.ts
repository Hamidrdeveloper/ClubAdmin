import axios, { AxiosResponse } from 'axios';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { CustomerStepModel } from '../model/CustomerStep.entity';

const customerStepStore = atom([]);

export const customerStepAtom = atomWithQuery((get) => ({
  queryKey: ['customerSteps', get(customerStepStore)],
  queryFn: async (): Promise<CustomerStepModel[]> => {
    const response: AxiosResponse<{ data: CustomerStepModel[] }> = await axios.get('customer-steps');

    return response.data.data;
  },
}));
