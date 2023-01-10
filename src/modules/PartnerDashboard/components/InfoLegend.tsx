import Text from 'antd/lib/typography/Text';
import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  amt: string | number | undefined;
  link?: string | ReactNode;
};
const InfoLegend = ({ text, amt }: Props): ReactElement => {
  return (
    <MainContainer>
      <Text>{text}</Text>
      {amt}
    </MainContainer>
  );
};

export default InfoLegend;

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 18px;
  color: #4e5157;
  margin: 8px 0;
  border-radius: 5px;
`;
