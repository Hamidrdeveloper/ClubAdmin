import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

import { DocumentTypeModel } from './DocumentType.entity';

export interface DocumentSettingsPure {
  id: number;
  logo_id: number;
  preview_link: string;
  translate: TranslateContext | GeneralTranslate[];
  data: {
    header: BasicProps;
    logo: BasicProps & { width: number };
    footer: BasicProps;
    body: BasicProps;
  }[];

  extra_elements: {
    invoice_address: LabelValueProps[];
    delivery_address: LabelValueProps[];
    page_number: LabelValueProps[];
    document_name: LabelProps;
    comment: LabelValueProps[];
  }[];

  stock_unit_elements: {
    position: StockUnitElementsProps;
    price: StockUnitElementsProps;
    quantity: StockUnitElementsProps;
    item_id: StockUnitElementsProps;
    item_name: StockUnitElementsProps;
    header: StockUnitElementsProps;
    VAT: StockUnitElementsProps;
    discount: StockUnitElementsProps;
  }[];

  mandatory_elements: {
    order_id: StockUnitElementsProps;
    date: StockUnitElementsProps;
    order_on: StockUnitElementsProps;
    customer_id: StockUnitElementsProps;
    currency: StockUnitElementsProps;
    referrer: StockUnitElementsProps;
    customer_class: StockUnitElementsProps;
    vat_number: StockUnitElementsProps;
    own_vat_number: StockUnitElementsProps;
    invoice_number: StockUnitElementsProps;
    payment_method: StockUnitElementsProps;
  }[];

  mlm_elements: {
    point: StockUnitElementsProps;
    bfu: StockUnitElementsProps;
    emp_vk: StockUnitElementsProps;
    rabatt: StockUnitElementsProps;
    career_level_bonus: StockUnitElementsProps;
    header: StockUnitElementsProps;
    career_level: StockUnitElementsProps;
    show_mlm: boolean;
  }[];
}

export interface DocumentSettingsModel extends DocumentSettingsPure {
  company: CompanyModel;
  documentType: DocumentTypeModel;
}
export interface DocumentSettingsFormCtx extends DocumentSettingsPure {
  company_id: number | undefined;
  document_type_id: number | undefined;
}

interface MarginProps {
  'margin-top': number;
  'margin-left': number;
  'margin-right': number;
  'margin-bottom': number;
}
interface FontProps {
  'font-weight': 'bold' | 'bolder' | 'normal' | 'lighter';
  'font-size': number;
  'text-align': 'left' | 'right' | 'center' | 'justify' | 'initial' | 'inherit';
}

interface BasicProps extends MarginProps, FontProps {
  isActive: boolean;
}

interface LabelProps extends BasicProps {
  label: string;
  width: number;
}

interface LabelValueProps {
  label: LabelProps;
  value: BasicProps;
}

interface StockUnitElementsProps extends BasicProps {
  priority: number;
  label: string;
  width: number;
}
