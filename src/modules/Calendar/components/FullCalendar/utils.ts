import { EventInput, ToolbarInput } from '@fullcalendar/react';

const todayStr = new Date().toISOString().replace(/T.*$/, '');

export const CALENDAR_TOOLBAR: ToolbarInput = {
  center: 'title',
  left: 'prev,next today',
  right: 'dayGridMonth,timeGridWeek,timeGridDay',
};

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: 'event-1',
    title: 'All-day event',
    start: todayStr,
  },
  {
    id: 'event-1',
    color: '#ed2559',
    title: 'Timed event',
    start: todayStr + 'T13:00:00',
    end: todayStr + 'T14:00:00',
  },
];
