import { User } from '@src/modules/User';

import { Calendar, CalendarCategory } from './calendar.entity';

export interface CalendarEventPure {
  file_id: number;
  title: string;
  description: string;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  color: string;
  location: string;
  url: string;
  is_repeating: boolean;
  is_full_day: boolean;
  attendees: string[];
  calendarCategories?: CalendarCategory[];
}

export interface CalendarEvent extends CalendarEventPure {
  id: number;
  user: User;
  user_id: number;
  calendar_id: number;
  calendar: Calendar;
  file_path: string;
  created_at: string;
  meta: Record<string, unknown>;
}

export interface CalenderEventFormContext extends CalendarEventPure {
  calendar_id: number;
  calendar_category_ids: number[];
}
