import React from 'react';
import styled from 'styled-components';

const NotificationCircleContainer = styled.span`
  width: fit-content;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: top;
`;

const _NotificationCircle = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const NotificationCircle: React.FC<{ color?: string }> = ({ color = '#D50000' }) => {
  return (
    <NotificationCircleContainer>
      <_NotificationCircle color={color} />
    </NotificationCircleContainer>
  );
};

export default NotificationCircle;
