import styled from 'styled-components';

const InputContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 16px;
  }

  .listCtrl {
    display: flex;
    gap: 8px;

    & > span {
      flex-grow: 1;
    }
  }
`;
export default { InputContainer };
