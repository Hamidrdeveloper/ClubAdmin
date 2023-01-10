import { CalendarPure } from './calendar.entity';

export interface CalendarFormContext extends CalendarPure {
  users: {
    ids: number[];
    is_visible?: boolean;
    is_editable?: boolean;
  };
}
