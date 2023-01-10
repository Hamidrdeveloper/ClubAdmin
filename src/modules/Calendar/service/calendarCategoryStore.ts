import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import CalendarCategoryModule from '../CalendarCategory.module';
import { CalendarCategory } from '../model/calendar.entity';

const calendarCategoryStore = atom([]);
const module = new CalendarCategoryModule();

export const calendarCategoryAtom = atomWithQuery((get) => ({
  queryKey: ['calendarCategories', get(calendarCategoryStore)],
  queryFn: async (): Promise<CalendarCategory[]> =>
    (await module.apiService.getAll({ pagination: { per_page: 100 } })).data,
}));
