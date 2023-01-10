import { User } from '@src/modules/User';
import { GeneralTranslate, TranslateContext } from '@src/shared/models';

export interface CalendarPure {
  id: number;
  name: string;
  user_id: number;
  is_active: boolean;
}

export interface Calendar extends CalendarPure {
  user: User;
  users: User[];
  created_at: string;
}

export interface CalendarCategoryPure {
  slug: string;
  sort: number;
  file_id: number;
  is_active: boolean;
  parent_id: number | null;
  parent: CalendarCategory;
  translate: GeneralTranslate[] | TranslateContext;
}

export interface CalendarCategory extends CalendarCategoryPure {
  id: number;
  name: string;
  file_path: string;
}
