import { RuleModel } from '@src/modules/Competition/model/Rule.entity';
import { User } from '@src/modules/User';

interface CompetitionResultPure {
  id: number;
  competition_rule_id: number;
  user_id: number;
  order_sale_id: number;
  points: number;
  created_at: string;
}

export interface CompetitionResultModel extends CompetitionResultPure {
  user: User;
  competitionRule: RuleModel;
}
