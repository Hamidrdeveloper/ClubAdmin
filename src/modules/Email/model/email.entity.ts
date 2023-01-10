import { User } from '@src/modules/User';
import { ReactNode } from 'react';

export interface InfoService {
  partner_id: null;
  slug: string;
  data: InfoServiceContext;
}

export interface InfoServiceContext {
  bcc_email: string;
  bcc: boolean | string;
  bcc_for_news_letter: boolean;
  email_address_for_new_order_email: string;
  send_email_after_new_order: boolean | string;
}

export interface LoginDetail {
  partner_id: null;
  slug: string;
  data: LoginDetailContext;
}

export interface LoginDetailContext {
  mode: string;
  name: string;
  email: string;
  outgoing_server: string;
  username: string;
  password: string;
  port: number;
  encryption: string;
}

export interface NewsLetter {
  partner_id: null;
  slug: string;
  data: NewsLetterContext;
}

export interface NewsLetterContext {
  mode: string;
  name: string;
  email: string;
  host: string;
  outgoing_server: string;
  username: string;
  password: string;
  port: number;
  encryption: string;
}

export interface Signature {
  partner_id: null;
  slug: string;
  data: SignatureContext[];
}

export interface SignatureContext {
  locale: string;
  html: ReactNode;
  plain: string;
}

export interface Automatic {
  id: number;
  slug: string;
  type: string;
  is_active: number;
  noticeTemplate: Record<string, number | null>;
}
export interface AutomaticContext {
  new_order: string;
  change_password: string;
  confirm_change_password: string;
  change_email_address: string;
  news_letter: string;
  confirm_news_letter: string;
  customer_register: string;
  tell_a_friend: string;
  new_scheduler_order: string;
  service_unit: string;
  modify_scheduler_order: string;
  forum_notification: string;
  notification_item_in_stock: string;
}

export interface EmailTemplatesPure {
  file_id: number;
  name: string;
  type: string;
  owner_id: number;
  created_by: number;
  updated_by: number;
  data: TemplateSettings;
  document_type_ids: number[];
  owner?: User;
  translate: TemplateTranslate[];
}

export interface EmailTemplates extends EmailTemplatesPure {
  id: number | null;
  file_path: string;
  documentType: EmailDocumentType[];
}

export interface EmailDocumentType {
  id: number;
  name: string;
}

export interface EmailTemplateVariables {
  label: string;
  name: string;
  scope: string;
}

interface TemplateTranslate {
  html: string;
  locale: string;
  title: string;
  plain_text: string;
  notice_template_id?: number;
}

export interface TemplateSettings {
  reply_to: string;
  template_type: string;
}
