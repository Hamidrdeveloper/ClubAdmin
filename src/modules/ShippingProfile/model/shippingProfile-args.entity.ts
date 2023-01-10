import { ShippingProfilePure } from '../model/shippingProfile.entity';

export interface ShippingProfileCountryModel {
  country_id: number;
  value: number | null;
}

export interface ShippingProfileFormContext extends ShippingProfilePure {
  partner_id: number;
  subdomain_id: number;
  countries: ShippingProfileCountryModel[];
}
