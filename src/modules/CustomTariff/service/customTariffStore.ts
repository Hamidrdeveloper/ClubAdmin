import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CustomTariffModule from '../CustomTariff.module';
import { CustomTariff } from '../model/customTariff.entity';

const customTariffStore = atom([]);

const module = new CustomTariffModule();

export const customTariffAtom = atomWithQuery((get) => ({
  queryKey: ['custom-tariff', get(customTariffStore)],
  queryFn: async (): Promise<CustomTariff[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 14 }, params: { isActive: true } })).data,
}));
