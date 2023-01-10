import { CountryPure } from './country.entity';

export interface CountryFormContext extends CountryPure {
  currency_id: number;
}
