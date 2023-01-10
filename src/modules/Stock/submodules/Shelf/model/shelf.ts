import { Regal } from '../../Regal/model/Regal';

interface ShelfPure {
  id: number;
  name: string;
  regal_id: number;
}
export interface Shelf extends ShelfPure {
  regal: Regal;
}
