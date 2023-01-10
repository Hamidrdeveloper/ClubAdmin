import { Row } from 'antd';
import styled from 'styled-components';

const MainContainer = styled(Row)`
  height: 100%;
`;

const HeaderLogo = styled.div`
  padding: 16px 0 32px 0;
`;

const SuccessContent = styled.div`
  & h5 {
    margin-bottom: 0.5rem;
    font-family: Nunito, sans-serif;
    font-weight: 700;
    line-height: 1.1;
    color: #364a63;
    font-size: 1.5rem;
  }

  & p {
    font-size: 1rem;
    color: #1ee0ac !important;
  }
`;

export default { MainContainer, HeaderLogo, SuccessContent };
