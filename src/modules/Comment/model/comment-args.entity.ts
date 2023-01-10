import { CommentPure } from './comment.entity';

export interface CommentFormContext extends CommentPure {
  currency_id: number;
  country_ids: number[];
  price_type_id: number;
}
