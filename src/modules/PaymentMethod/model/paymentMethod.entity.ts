import { PaymentMethodType } from '@modules/PaymentMethodType';
import { Price } from '@modules/Price';
import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PaymentMethodPure {
  id: number;
  name: string;
  due_days: number;
  description: string;
  price_value: number;
  file_id: string | number;
  file_path: string | number;
  discount_percentage: number;
  is_link_generatable: boolean;
  _data: Record<string, string>;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface PaymentMethod extends PaymentMethodPure {
  price: Price;
  company: CompanyModel;
  paymentMethodType: PaymentMethodType;
}
