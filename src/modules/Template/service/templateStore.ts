import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { Template } from '../model/template.entity';
import TemplateModule from '../Template.Module';

const templateStore = atom([]);
const module = new TemplateModule();

export const templateAtom = atomWithQuery((get) => ({
  queryKey: ['template', get(templateStore)],
  queryFn: async (): Promise<Template[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 15 }, params: { isActive: true } })).data,
}));
