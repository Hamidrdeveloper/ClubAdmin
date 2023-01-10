import styled from 'styled-components';

const MainContainer = styled.h4`
  display: flex;
  color: ${(props) => props.theme.colors.main};
  white-space: nowrap;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
  font-weight: bold;

  & div {
    background-color: ${(props) => props.theme.colors.main};
    white-space: nowrap;
    height: 3px;
    width: 100%;
    margin-left: 10px;
  }
`;

export default { MainContainer };
