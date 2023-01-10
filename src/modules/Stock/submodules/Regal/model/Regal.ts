import { Zone } from '../../Zone/model/zone';

export interface RegalPure {
  id: number;
  name: string;
}
export interface Regal extends RegalPure {
  zone: Zone;
}
export interface RegalFormCtx extends RegalPure {
  zone_id: number;
}
