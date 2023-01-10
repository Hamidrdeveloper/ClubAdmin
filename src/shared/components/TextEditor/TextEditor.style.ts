import styled from 'styled-components';

const MainContainer = styled.div<{ height: number }>`
  & .ql-container {
    height: ${(props) => props.height}px;
  }
`;

export default { MainContainer };
