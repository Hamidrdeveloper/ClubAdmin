import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { User } from '..';

// This is what we recieve from backend
export interface UserDocs {
  link: string;
  number: string;
  user: User;
  file_id: number;
  user_id: number;
  order_id: string;
  created_by: User;
  created_at: string;
  updated_at: string;
  created_by_id: number;
  document_type_id: number;
  documentType: DocumentType;
  created_by_fullname: string;
}

interface DocumentType {
  id: number;
  name: string;
  translate: TranslateContext | GeneralTranslate[];
}
