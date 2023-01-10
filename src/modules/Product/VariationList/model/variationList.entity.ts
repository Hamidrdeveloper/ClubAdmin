export interface Variation {
  id: number;
  name: string;
  type: string;
  number: string;
  quantity: number;
  point: number;
  is_active: boolean;
  release_date: Date;
  available_until: Date;
}
