import styled from 'styled-components';

const DescriptionFormList = styled.div`
  &:not(:last-child) {
    border-bottom: 1px dashed #ededed;
    padding-bottom: 16px;
    margin-bottom: 24px;
  }
`;

const DescriptionContainer = styled.div`
  border: 1px solid #e9e9e9;
  border-radius: 8px;
  padding: 16px;
`;

export default { DescriptionFormList, DescriptionContainer };
