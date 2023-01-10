// Warning : Prettier Is Disabled For This File Because of Order Of Calendar Importing
import FullCalendar, { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import React from 'react';
import styled from 'styled-components';

import { CALENDAR_TOOLBAR } from './utils';
import moment from 'moment';
import { CalendarEventPure } from '../../model/event.entity';

type Props = { 
  events: EventInput[] 
  onClickEvent: (data: EventClickArg) => void; 
  onCreateEvent: (data: DateSelectArg) => void; 
  onCreateByDrag: (data: Partial<CalendarEventPure>) => void; 
};
const CalendarEvents: React.FC<Props> = ({ events, onClickEvent, onCreateEvent, onCreateByDrag }) => {
  const onDropEvent = (data:DropArg) => {
    const dates = {
      start_date: moment(data.dateStr).format('YYYY-MM-DD'),
      end_date: moment(data.dateStr).format('YYYY-MM-DD'),
      start_time: moment(data.dateStr).format('HH:mm'),
      end_time: moment(data.dateStr).format('HH:mm')
    }

    const values: Partial<CalendarEventPure> = {
      ...dates,
      is_full_day : data.allDay,
      is_repeating : false,
      title : data.draggedEl.title,
      color : data.draggedEl.dataset['color'],
    }

    onCreateByDrag(values)
  }

  return (
    <CalendarContainer>
      <FullCalendar
        selectable
        dayMaxEvents
        droppable
        events={events}
        drop={onDropEvent}  
        select={onCreateEvent}
        eventClick={onClickEvent}
        initialView="dayGridMonth"
        headerToolbar={CALENDAR_TOOLBAR}
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        eventTimeFormat={{ hour: '2-digit', minute: '2-digit', hour12: false }}
      />
    </CalendarContainer>
  );
};

export default CalendarEvents;

const CalendarContainer = styled.div`
  height: 100%;
  width: 100%;

  & .fc-toolbar-chunk {
    & button.fc-button {
      text-transform: capitalize;
    }
  }

  & .fc-dayGridMonth-view {
    & td,
    th {
      border: none !important;
    }

    & .fc-scrollgrid {
      border-radius: 16px;
      overflow: hidden;
      background: #e7ebf2;
      border: none !important;
      padding: 8px;
    }

    & .fc-col-header-cell.fc-day {
      background: #e7ebf2;
      border: none !important;

      & .fc-scrollgrid-sync-inner {
        padding: 16px 0 4px 0;
      }
    }

    & .fc-daygrid-day {
      padding: 4px;
      background: #e7ebf2;
      border: none !important;

      &.fc-day-today {
        background: #e7ebf2 !important;

        & .fc-daygrid-day-frame {
          border: 2px solid ${(props) => props.theme.colors.secondary};
        }
      }

      & .fc-daygrid-day-frame {
        background: #fff;
        border-radius: 16px;

        & .fc-daygrid-day-top {
          padding: 4px;
          font-size: 1.1rem;
        }
      }
    }
  }
`;
