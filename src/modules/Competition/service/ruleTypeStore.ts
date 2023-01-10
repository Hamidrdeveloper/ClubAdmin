import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { RuleTypeModel } from '../model/RulesType.entity';

const ruleTypeStore = atom([]);
const API = new ApiBuilder<RuleTypeModel>('competition-rule-types', i18n.t('Competition.Rule.RuleType'));

export const ruleTypeAtom = atomWithQuery((get) => ({
  queryKey: ['ruleType', get(ruleTypeStore)],
  queryFn: async (): Promise<RuleTypeModel[]> => (await API.getAll({ pagination: { per_page: 10 } })).data,
}));
