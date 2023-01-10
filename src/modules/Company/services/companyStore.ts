import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CompanyModule from '../Company.module';
import { CompanyModel } from '../model/company.entity';

const companyStore = atom([]);
const module = new CompanyModule();

export const companyAtom = atomWithQuery((get) => ({
  queryKey: ['company', get(companyStore)],
  queryFn: async (): Promise<CompanyModel[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 259 }, params: { isActive: true } })).data,
}));
