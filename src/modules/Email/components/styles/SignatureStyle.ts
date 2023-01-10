import styled from 'styled-components';

const MainContainer = styled.div`
  padding: 18px;
  & .row {
    margin-bottom: 50px;
    & .first-col,
    & .second-col {
      padding: 12px;
      border-radius: 4px;
      box-shadow: 0 0 10px #eaece4;

      & .ant-form-item {
        padding: 12px;
        & .ant-input {
          height: 262px;
        }
      }
    }
  }
`;

export default { MainContainer };
