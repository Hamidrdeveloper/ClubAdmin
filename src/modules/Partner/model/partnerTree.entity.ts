import { Country } from '@src/modules/Country';

export interface SinglePartnerTree {
  id: number;
  userId: number;
  level: string;
  email: string;
  avatar: string;
  active: boolean;
  fullName: string;
  coachFullName: string;
  sponsorFullName: string;
  children: SinglePartnerTree[];
}

export interface PartnerTree {
  data: any;
  id: number;
  depth: number;
  email: string;
  avatar: string;
  mobile: string;
  user_id: number;
  country: Country;
  left_tree: number;
  right_tree: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  country_id: number;
  is_approved: boolean;
  career_step_name: string;
  coach_full_name: string;
  sponsor_full_name: string;
  children: PartnerTree[];
  person: PartnerTreePerson;
}

interface PartnerTreePerson {
  id: number;
  gender: string;
  last_name: string;
  full_name: string;
  first_name: string;
  created_by: string;
  company_name: string;
}
