import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CommentModule from '../Comment.module';
import { Comment } from '../model/comment.entity';

const commentStore = atom([]);
const module = new CommentModule();

export const commentAtom = atomWithQuery((get) => ({
  queryKey: ['comment', get(commentStore)],
  queryFn: async (): Promise<Comment[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 13 }, params: { isActive: true } })).data,
}));
