import { OrderContactGroup } from '@src/modules/Order';
import { Partner } from '@src/modules/Partner';
import { PaymentMethod } from '@src/modules/PaymentMethod';
import { SocialMediaModel } from '@src/modules/ShopSettings/model/socialMedia.entity';
import { User } from '@src/modules/User';

import { AnalyticTagsModel } from '../model/analyticTags.entity';
import { PartnerModel } from './partner.entity';

export interface Subdomain {
  id: number;
  contact_group_id: number;
  description: string;
  file_id: number;
  file_path: string;
  hours: string[] | null;
  is_active: boolean;
  is_approved: boolean;
  name: string;
  partner_id: number;
  title: string | null;
  partner: Partner;
  contactGroup: ContactGroup;
  paymentMethods: PaymentMethod[];
  socials: SocialMediaModel[] | null;
  translate: SubdomainTranslate[];
  _data: {
    analytic_tag: AnalyticTagsModel[] | [];
    social_media: SocialMediaModel[] | [];
    partner: PartnerModel | null;
  };
}

export interface ContactGroup extends OrderContactGroup {
  country_id: number;
  title: string;
  emails: Email[];
  phones: Phone[];
  websites: Website[];
  translate: ContactGroupTranslate[];
}

interface Email {
  id: number;
  email: string;
}
interface Website {
  id: number;
  type: string;
  url: string;
}

interface Phone {
  id: number;
  type: string;
  number: string;
}
interface ContactGroupTranslate {
  contact_group_id: number;
  locale: string;
  title: string;
}

export interface SubdomainContext {
  name: string;
  file_id: number;
  file_path: string;
  is_active: boolean;
  partner_id: number;
  is_approved: boolean;
  hours: string[] | null;
  contact_group_id: number;
  translate: SubdomainTranslate[];
  socials: SocialMediaModel[] | null;
  payment_method_ids: number[] | null;
}

export interface SubdomainTranslate {
  subdomain_id: number;
  locale: string;
  title: string | null;
  description: string;
}

export interface SubDomainPartner extends Partner {
  user: User;
}
