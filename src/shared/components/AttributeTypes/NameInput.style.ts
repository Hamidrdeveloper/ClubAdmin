import styled from 'styled-components';

const InputContainer = styled.div`
  gap: 8px;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  & span[role='img'].icon {
    font-size: 16px;
    color: rgb(24, 144, 255);
  }
`;
export default { InputContainer };
