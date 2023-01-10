import { Country } from '@src/modules/Country';
import { Partner } from '@src/modules/Partner';
import { Subdomain } from '@src/modules/Subdomain';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface ShippingProfilePure {
  id: number;
  name: string;
  // I don't know why backend changed icon property name into Icon
  // icon: string;
  Icon: string;
  icon_id: number;
  type: string;
  tracking_link: string;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface ShippingProfile extends ShippingProfilePure {
  partner: Partner;
  countries: Country[];
  subdomain: Subdomain;
}
