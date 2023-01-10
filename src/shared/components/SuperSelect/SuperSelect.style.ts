import styled from 'styled-components';

const NewItemContainer = styled.div`
  padding: 16px;
  color: ${(props) => props.theme.colors.main};
  border-top: 1px solid ${(props) => props.theme.colors.grey};

  & .ant-space {
    cursor: pointer;
  }
`;

export default { NewItemContainer };
