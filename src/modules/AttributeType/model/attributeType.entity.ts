import { AT_Options } from '@src/modules/AttributeOptions/model/attributeOptions.entity';
import { Partner } from '@src/modules/Partner';
import { Subdomain } from '@src/modules/Subdomain';
import { VariationCategory } from '@src/modules/VariationCategory';

export interface AttributeTypesPure {
  id: number;
  name: string;
  title: string;
  position: number | null;
  partner_id: number | null;
  subdomain_id: number | null;
  picture_connectable: boolean;
  selectable_type: 'dropdown' | 'picture' | 'box';

  translate: {
    attribute_type_id: number;
    locale: string;
    name: string;
    title: string | null;
  }[];
}
export interface AttributeTypes extends AttributeTypesPure {
  partner: Partner;
  subdomain: Subdomain;
  attributeTypeOptions: AT_Options[];
  productVariationCategories: VariationCategory[];
}
