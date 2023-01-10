import styled from 'styled-components';

const Footer = styled.div`
  background-color: rgb(217, 219, 225);
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 16px 30px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  a {
    margin: 0 10px;
    color: ${(props) => props.theme.colors.main};
  }
  & .ant-space {
    color: ${(props) => props.theme.colors.main};
    flex: 1;
    & h5 {
      color: ${(props) => props.theme.colors.main};
      font-size: 15px;
      padding-top: 5px;
    }
  }
`;

export default { Footer };
