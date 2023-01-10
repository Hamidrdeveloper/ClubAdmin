import { Form } from 'antd';
import styled from 'styled-components';

const MainContainer = styled(Form)`
  & {
    & > * {
      margin: 8px;
    }

    width: 100vw;
    height: 100vh;
    display: flex;
    border: 1px solid red;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
  }

  .code-container {
    border: 1px solid #cccccc;
    background-color: #f6f6f6;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & .code-btn-container {
      display: flex;
      flex-direction: column;

      padding: 18px;
      & > .ant-btn {
        margin-top: 20px;
      }
    }
  }
`;

export default MainContainer;
