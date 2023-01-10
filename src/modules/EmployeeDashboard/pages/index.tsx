import React, { ReactElement } from 'react';
import styled from 'styled-components';

const EmployeeDashboard = (): ReactElement => {
  return (
    <MainContainer>
      <h1>Employee Dashboard</h1>
      <pre>To Be Developed</pre>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export default EmployeeDashboard;
