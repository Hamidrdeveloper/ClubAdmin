import { User } from '@src/modules/User';

export interface Referrer {
  id: number;
  owner_id: number | null;
  number: number | null;
  slug: string;
  title: string | null;
  is_active: boolean;
  is_basic: boolean;
  created_at: string | null;
  owner: User | null;
}
