import { EventContentArg } from '@fullcalendar/react';
import React from 'react';

const SingleEvent: React.FC<EventContentArg> = (eventContent) => {
  return (
    <div
      style={{
        display: 'flex',
        border: '1px solid',
        borderColor: eventContent.borderColor,
        whiteSpace: 'pre-wrap',
      }}
    >
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </div>
  );
};

export default SingleEvent;
