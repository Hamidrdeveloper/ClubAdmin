import styled from 'styled-components';

const NumberSeriesDescription = styled.div`
  gap: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #ccc;
  }
`;
export default { NumberSeriesDescription };
