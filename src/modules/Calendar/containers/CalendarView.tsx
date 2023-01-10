import { RightOutlined } from '@ant-design/icons';
import { DateSelectArg, EventClickArg, EventInput } from '@fullcalendar/react';
import { ModalHeader } from '@src/shared/components';
import { Col, Modal, Row, Typography } from 'antd';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CalenderEventForm from '../components/CalendarEventForm';
import DraggableEvents from '../components/FullCalendar/DraggableEvents';
import CalendarEvents from '../components/FullCalendar/Events';
import { CalendarEvent, CalendarEventPure, CalenderEventFormContext } from '../model/event.entity';
import {
  createCalendarEvent,
  deleteCalendarEvent,
  updateCalendarEvent,
} from '../service/calendarEvent.service';

const CalendarView: React.FC<{
  calendarId?: string;
  calendarEvents: CalendarEvent[];
  afterEventDelete: (data: number) => void;
  afterEventCreate: (data: CalendarEvent) => void;
  afterEventUpdate: (data: CalendarEvent) => void;
}> = ({ calendarId, calendarEvents, afterEventCreate, afterEventUpdate, afterEventDelete }) => {
  const { t } = useTranslation();
  const [isVisible, setVisible] = React.useState(false);
  const [isPending, setPending] = React.useState(false);
  const [events, setEvents] = React.useState<EventInput[]>([]);
  const [initDate, setInitDate] = React.useState<string | string[]>();
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent>();

  const setEventsCallback = useCallback(() => {
    if (calendarEvents.length) {
      setEvents(
        calendarEvents.map((event) => ({
          title: event.title,
          color: event.color,
          id: String(event.id),
          allDay: event.is_full_day,
          end: `${event.end_date}T${event.end_time}`,
          start: `${event.start_date}T${event.start_time}`,
        })),
      );
    }
  }, [calendarEvents]);

  useEffect(() => {
    setEventsCallback();
  }, [calendarEvents]);

  const handleEventSubmit = (formValues: CalendarEventPure) => {
    const { calendarCategories, ...restValues } = formValues;

    const values: Partial<CalenderEventFormContext> = {
      ...restValues,
      calendar_id: Number(calendarId),
      calendar_category_ids: (calendarCategories || []).map((category) => category.id),
    };

    setPending(true);
    if (selectedEvent) {
      updateCalendarEvent(selectedEvent.id, values)
        .then((data) => {
          setPending(false);
          setVisible(false);
          setSelectedEvent(undefined);
          afterEventUpdate(data);
        })
        .catch(() => setPending(false));
    } else {
      createCalendarEvent(values)
        .then((data) => {
          setPending(false);
          setVisible(false);
          setInitDate(undefined);
          afterEventCreate(data);
        })
        .catch(() => setPending(false));
    }
  };

  const handleCloseModal = () => {
    setVisible(false);
    setInitDate(undefined);
    setSelectedEvent(undefined);
  };

  const handleEventClick = (args: EventClickArg) => {
    const foundEvent = calendarEvents.find((event) => event.id === Number(args.event.id));

    if (foundEvent) {
      setSelectedEvent(foundEvent);
      setVisible(true);
    }
  };

  const handleCalendarEventCreate = (args: DateSelectArg) => {
    if (moment(args.start).isSameOrAfter(moment())) {
      const startDate = moment(args.startStr);
      const endDate = moment(args.endStr);
      const duration = endDate.diff(startDate, 'days');
      if (duration > 1) {
        setInitDate([startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD')]);
      } else {
        setInitDate(startDate.format('YYYY-MM-DD'));
      }
      setVisible(true);
    }

    const calendarAPI = args.view.calendar;
    calendarAPI.unselect();
  };

  const handleEventDelete = () => {
    if (selectedEvent) {
      setPending(true);
      deleteCalendarEvent(selectedEvent.id)
        .then(() => {
          setPending(false);
          setVisible(false);
          setSelectedEvent(undefined);
          afterEventDelete(selectedEvent.id);
        })
        .catch(() => setPending(false));
    }
  };

  return (
    <MainContainer>
      <Row gutter={[16, 16]} className="calendar">
        <Col span={18}>
          <CalendarEvents
            events={events}
            onClickEvent={handleEventClick}
            onCreateByDrag={handleEventSubmit}
            onCreateEvent={handleCalendarEventCreate}
          />
        </Col>

        <Col span={6}>
          <CreateButton onClick={() => setVisible(true)}>
            <Typography.Title level={4}>Create Event</Typography.Title>

            <RightOutlined />
          </CreateButton>
          <Modal
            width={500}
            footer={false}
            destroyOnClose
            closable={true}
            visible={isVisible}
            onCancel={handleCloseModal}
            title={
              <ModalHeader
                onClose={handleCloseModal}
                items={[{ path: '', breadcrumbName: t('Calendar.Event.Title') }]}
              />
            }
          >
            <CalenderEventForm
              initDate={initDate}
              isPending={isPending}
              onSubmit={handleEventSubmit}
              initialValues={selectedEvent}
              onEventDelete={handleEventDelete}
            />
          </Modal>

          <DraggableEvents />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default CalendarView;

const MainContainer = styled.div`
  display: flex;
  min-height: 100%;

  & .calendar {
    width: 100%;
    min-height: 700px;
  }
`;

const CreateButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 16px;
  border-radius: 16px;
  margin-top: 60px;
  cursor: pointer;
  background: ${(props) => props.theme.colors.main};

  & h4 {
    margin: 0;
    color: #fff;
  }
`;
