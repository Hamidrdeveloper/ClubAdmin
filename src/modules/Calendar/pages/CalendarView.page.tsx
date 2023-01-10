import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CalendarModule from '../Calendar.module';
import { Calendar } from '../model/calendar.entity';
import { CalendarEvent } from '../model/event.entity';
import moduleInfo from '../ModuleInfo.json';
import { getCalendarEvents } from '../service/calendarEvent.service';

const LazyCalendar = lazy(() => import('../containers/CalendarView'));

const CalendarViewPage: React.FC = () => {
  const navigate = useNavigate();
  const { calendar_id: id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const calendarModule = new CalendarModule();
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...calendarModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: 'Calendar Events',
    },
  ];

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    getCalendarEvents(Number(id)).then((events) => {
      setEvents(events);
      setLoading(false);
    });
  }, []);

  const handleCreate = (data: CalendarEvent) => {
    setEvents([...events, data]);
  };

  const handleUpdate = (data: CalendarEvent) => {
    setEvents(events.map((event) => (event.id === data.id ? data : event)));
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <PageLayout<Calendar> module={calendarModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>

          <Suspense fallback={<p>Loading</p>}>
            {isLoading ? (
              <Loader />
            ) : (
              <LazyCalendar
                calendarId={id}
                calendarEvents={events}
                afterEventDelete={handleDelete}
                afterEventCreate={handleCreate}
                afterEventUpdate={handleUpdate}
              />
            )}
          </Suspense>
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default CalendarViewPage;
