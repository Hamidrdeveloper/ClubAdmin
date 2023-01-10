import { CompanyModel } from '@src/modules/Company/model/company.entity';
import { PartnerDashboardGoalsData } from '@src/modules/PartnerDashboard/components/TotalCustomers.tsx/model/customerGoals.entity';
import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface PartnerPure {
  id: number;
  left_tree: number;
  right_tree: number;
  mobile: string;
  bank_name: string;
  iban: string;
  default_warranty_days: number;
  swift: string;
  receive_vat_responsible: boolean;
  send_vat_responsible: boolean;
  active_auto_bonus: boolean;
  active_training_bonus: boolean;
  post_delivery_factor: boolean;
  receive_commission: boolean;
  can_buy: boolean;
  transportation_ratio_percentage: number;
  over_personal_turnover: boolean;
  can_see_down_line: boolean;
  inhouse_sale: boolean;
  has_network: boolean;
  has_btob: boolean;
  has_btoc: boolean;
  has_warehouse: boolean;
  has_delivery: boolean;
  warranty_days: number;
  max_client_root: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean | string;
  is_approved: boolean;
  country_id: number;
  front_identity_card_id: number;
  backIdentityCard: File;
  businessCertification: File;
  frontIdentityCard: File;
  back_identity_card_id: number;
  business_certification_id: number;
  user_id: number;
  coach_id: number;
  user: User;
  partners_count: number;
  sponsors_count: number;
  coachs_count: number;
  company_id: number | null;
  is_promotional_article_active: boolean;
  public_findable: string;
  translate: GeneralTranslate[] | TranslateContext;
  _data: { dashboard: PartnerDashboardGoalsData };
  quit_at: string | null;
}

export interface Partner extends PartnerPure {
  coach: Partner;
  parent: Partner;
  company: CompanyModel;
  // careerStep: CareerStep;
  fullname: string;
}
