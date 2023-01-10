import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface DocumentTypeModel {
  id: number;
  owner_id: number;
  name: string;
  type: string;
  created_by: null;
  updated_by: null;
  data: {
    reply_to: null;
    template_type: string;
  };
  file_id: null | number;
  file_path: null | string;
  owner: null;
  translate: GeneralTranslate[] | TranslateContext;
  documentType: [];
}
