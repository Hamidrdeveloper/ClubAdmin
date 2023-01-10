import styled from 'styled-components';

const MainContainer = styled.div`
  & button {
    color: #000;
    background: #e4e4eb;
    border: none;

    &:hover {
      background: #e4e4eb;
    }
  }

  & .title {
    margin-inline: 8px;
    text-transform: uppercase;
    color: ${(props) => props.theme.colors.main};
  }
`;

export default { MainContainer };
