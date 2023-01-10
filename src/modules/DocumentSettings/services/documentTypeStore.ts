import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { DocumentTypeModel } from '../model/DocumentType.entity';

const documentTypeStore = atom([]);
const API = new ApiBuilder<DocumentTypeModel>('document-types', i18n.t('DocumentSettings.DocumentType'));

export const documentTypeAtom = atomWithQuery((get) => ({
  queryKey: ['document-type', get(documentTypeStore)],
  queryFn: async (): Promise<DocumentTypeModel[]> =>
    (await API.getAll({ pagination: { per_page: 46 } })).data,
}));
