import { Currency } from '@src/modules/Currency';

export interface AboutPartnerModel {
  full_name: string;
  gender: string;
  career_step_name: string;
  user_currency: Pick<Currency, 'symbol'>;
}
