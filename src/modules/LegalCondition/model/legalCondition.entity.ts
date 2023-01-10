import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { Role } from '@src/modules/Role';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

interface LegalConditionTranslate {
  description: string;
  locale: { locale: string };
  legal_disclosure_id: string | null;
}
export interface LegalCondition extends LegalConditionTranslate {
  id: number;
  roles: Role[];
  role_ids: number[];
  company_id: number;
  description: string;
  company: CompanyModel;
  translate: GeneralTranslate[] | TranslateContext;
}
