import { Permission } from '@src/modules/Permission';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface RolePure {
  id: number;
  slug: string;
  title: string;
  company_visibility: boolean | string;
  owner_visibility: boolean | string;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface Role extends RolePure {
  permissions: Permission[];
}
