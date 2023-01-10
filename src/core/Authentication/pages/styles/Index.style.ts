import { Col, Row } from 'antd';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
`;

const LayoutSt = styled(Row)`
  width: 100%;
  min-height: 100vh;
`;

const MainBackground = styled(Col)`
  background: #f5f6fa;

  @media (max-width: 768px) {
    display: none;
  }

  & .inner-background {
    width: 100%;
    height: 100%;
    max-width: 550px;
    padding: 2.75rem;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & .side-container {
      display: flex;
      align-items: center;
      justify-content: center;

      & img {
        width: 100%;
        z-index: 2;
        display: block;
        text-align: center;
      }
    }
  }

  & .content-container {
    padding: 32px 0;
    text-align: center;

    & .subtitle {
      padding: 16px 0;

      & p {
        font-weight: 500;
      }
    }
  }
`;

export default { MainContainer, LayoutSt, MainBackground };
