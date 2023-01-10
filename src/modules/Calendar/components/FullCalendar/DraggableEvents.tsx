import { Draggable } from '@fullcalendar/interaction';
import { Typography } from 'antd';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const DraggableEvents: React.FC = () => {
  useEffect(() => {
    const draggableEl = document.getElementById('external-events');
    new Draggable(draggableEl as HTMLElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        const title = eventEl.getAttribute('title');
        const color = eventEl.getAttribute('data-color');
        return { title, color };
      },
    });
  }, []);

  const dragEvents = [
    { title: 'Meeting Event', color: '#ed2559' },
    { title: 'Team Seminar', color: '#2550ed' },
    { title: 'Company Meeting', color: '#1a9748' },
    { title: 'Team Ceremony', color: '#ed25ed' },
    { title: 'End-Year Meeting', color: '#183a7a' },
  ];

  return (
    <MainContainer id="external-events">
      <Typography.Title level={4}>Events</Typography.Title>
      {dragEvents.map((event, idx) => (
        <SingleEvent
          key={`event-${idx}`}
          color={event.color}
          title={event.title}
          data-color={event.color}
          className="single-event fc-event"
        >
          {event.title}
        </SingleEvent>
      ))}
    </MainContainer>
  );
};

export default DraggableEvents;

const MainContainer = styled.div`
  padding: 16px;
`;

const SingleEvent = styled.div<{ color: string }>`
  background: #fff;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.color};
  border-left-width: 8px;
  cursor: move;
  color: ${(props) => props.theme.colors.main};
`;
