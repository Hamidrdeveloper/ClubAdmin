export interface User {
  id: number;
  username: string;
  avatar: string;
}
export interface CommentPure {
  id: number;
  reply_to: number;
  product_dimension_id: 1;
  approved: boolean;
  description: string;
}

export interface Comment extends CommentPure {
  user: User;
}
