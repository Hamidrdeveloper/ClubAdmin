import { Building } from '../submodules/Building/model/Building';
import { Floor } from '../submodules/Floor/model/floor';
import { Regal } from '../submodules/Regal/model/Regal';
import { Shelf } from '../submodules/Shelf/model/shelf';
import { Zone } from '../submodules/Zone/model/zone';

interface StorageVariationPure {
  id: number;
  warehouse_id: number;
  building_id: number;
  floor_id: number;
  zone_id: number;
  regal_id: number;
  shelf_id: number;
  name?: string;
}

export interface StorageVariation extends StorageVariationPure {
  building: Building;
  floor: Floor;
  zone: Zone;
  regal: Regal;
  shelf: Shelf;
}
