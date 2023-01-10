import { PartnerPure } from './partner.entity';

export interface PartnerFormContext extends PartnerPure {
  parent_id: number;
  career_step_id: number;
  company_id: number | null;
}
