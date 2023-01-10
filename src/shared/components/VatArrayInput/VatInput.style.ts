import styled from 'styled-components';

const VatInputContainer = styled.div`
  gap: 8px;
  display: flex;
  &:not(::last-child) {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #ccc;
  }
`;

export default { VatInputContainer };
