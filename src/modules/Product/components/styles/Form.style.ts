import { Form } from 'antd';
import styled from 'styled-components';

const FormContainer = styled(Form)`
  & .form-container {
    padding: 16px;
  }
  .form-content {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px,
      rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  }
`;

const FieldListDivider = styled.div`
  padding: 16px 8px;

  & .ant-upload-drag-container {
    height: 168px;
  }

  &:not(:last-child) {
    border-bottom: 1px dashed #ededed;
    margin-bottom: 24px;
  }
`;

export default { FormContainer, FieldListDivider };
