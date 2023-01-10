import styled from 'styled-components';

const NumberSeriesContainer = styled.div`
  gap: 8px;
  display: flex;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 20px;
  &:not(:last-child) {
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px dashed #ccc;
  }
`;
export default { NumberSeriesContainer };
