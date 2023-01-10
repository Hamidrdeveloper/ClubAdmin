import { Floor } from '../../Floor/model/floor';

export interface ZonePure {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Zone extends ZonePure {
  floor: Floor;
}

export interface ZoneFormCtx extends ZonePure {
  floor_id: number;
}
