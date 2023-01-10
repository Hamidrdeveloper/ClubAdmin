import { FileImageOutlined } from '@ant-design/icons';
import Env from '@config/ConfigureEnv';
import { Avatar, Radio, RadioChangeEvent, Tooltip } from 'antd';
import { useAtom } from 'jotai';
import React from 'react';
import styled from 'styled-components';

import { Availability } from '../model/Availability.entity';
import { availabilityAtom } from '../service/availabilityStore';

const MainContainer = styled(Radio.Group)`
  & .ant-radio-wrapper {
    flex-direction: column-reverse;
    align-items: center;

    & .ant-radio {
      top: 0;
      margin: 10px 0;
    }

    &:after {
      height: 0;
    }
  }
`;

interface AvailabilityRadioProps {
  value?: number;
  onChange?: (e: RadioChangeEvent) => void;
}

const AvailabilityRadio: React.FC<AvailabilityRadioProps> = ({ value, onChange }) => {
  const [availabilities] = useAtom<Availability[]>(availabilityAtom);

  return (
    <MainContainer value={value} onChange={onChange}>
      {availabilities.map((item) => (
        <Tooltip title={item.name} key={item.id}>
          <Radio value={item.id}>
            <Avatar icon={<FileImageOutlined />} src={Env.PURE_URL + item.file} />
          </Radio>
        </Tooltip>
      ))}
    </MainContainer>
  );
};

export default AvailabilityRadio;
