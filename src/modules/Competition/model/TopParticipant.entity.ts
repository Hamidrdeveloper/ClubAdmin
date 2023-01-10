import { User } from '@src/modules/User';

interface TopParticipantPure {
  id: null;
  points: number;
  user_id: number;
  created_at: string;
  order_sale_id: null;
  competition_rule_id: null;
}
export interface TopParticipantModel extends TopParticipantPure {
  user: User;
}
