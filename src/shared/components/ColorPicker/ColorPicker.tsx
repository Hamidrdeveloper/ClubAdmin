import { Input } from 'antd';
import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = { value?: string; onChange?: (value: string) => string };
const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <Container>
      <Input type="color" onChange={handleChange} value={value} />
      <Input type="text" value={value} onChange={handleChange} />
    </Container>
  );
};

export default ColorPicker;

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  width: 100%;

  & .ant-input[type='color'] {
    height: 32px;
    width: 50px;
  }
`;
