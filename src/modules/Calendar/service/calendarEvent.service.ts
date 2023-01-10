/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import axios, { AxiosResponse } from 'axios';

import { CalendarEvent, CalenderEventFormContext } from '../model/event.entity';

const eventAPI = new ApiBuilder<CalendarEvent>('calendar-events', i18n.t('Calendar.Event.Title'));
export const createCalendarEvent = async (
  values: Partial<CalenderEventFormContext>,
): Promise<CalendarEvent> => {
  return await eventAPI.createOne(values);
};

export const updateCalendarEvent = async (
  eventId: number,
  values: Partial<CalenderEventFormContext>,
): Promise<CalendarEvent> => {
  return await eventAPI.updateOne(eventId, values);
};

export const deleteCalendarEvent = async (eventId: number): Promise<CalendarEvent> => {
  try {
    type Res = AxiosResponse<{ data: CalendarEvent }>;
    const response: Res = await axios.delete(`calendar-events/${eventId}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getCalendarEvents = async (calendarId: number): Promise<CalendarEvent[]> => {
  try {
    type Res = AxiosResponse<{ data: CalendarEvent[] }>;
    const response: Res = await axios.get(`calendar-events`, {
      params: { orderBy: { id: 'DESC' }, per_page: 50, calendarId },
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
