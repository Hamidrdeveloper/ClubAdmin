import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { EmailDocumentType, EmailTemplateVariables, EmailTemplates } from '../model/email.entity';
import { getDocumentTypes, getTemplate, getTemplateVariables } from './email.service';

const documentTypeStore = atom([]);
export const documentTypeAtom = atomWithQuery((get) => ({
  queryKey: ['documentTypes', get(documentTypeStore)],
  queryFn: async (): Promise<EmailDocumentType[]> => await getDocumentTypes(),
}));

const variablesStore = atom([]);
export const variablesAtom = atomWithQuery((get) => ({
  queryKey: ['variables', get(variablesStore)],
  queryFn: async (): Promise<EmailTemplateVariables[]> => await getTemplateVariables(),
}));

const emailTemplateStore = atom([]);
export const emailTemplateAtom = atomWithQuery((get) => ({
  queryKey: ['templates', get(emailTemplateStore)],
  queryFn: async (): Promise<EmailTemplates[]> => await getTemplate({ per_page: 100 }),
}));
