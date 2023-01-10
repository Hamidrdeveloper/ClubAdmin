import { Building } from '../../Building/model/Building';

export interface FloorPure {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
export interface Floor extends FloorPure {
  building: Building;
}

export interface FloorFormCtx extends FloorPure {
  building_id: number;
}
