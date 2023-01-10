import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { Button, Col } from 'antd';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  id: number;
  span?: number;
  imagePath: string | undefined;
  filePath: string | undefined;
};
const onErrorHandler = (ev) => {
  ev.target.src = '/assets/icons/other/no-image-icon.png';
};

const FilePreview = ({ span = 6, imagePath, filePath, id }: Props): ReactElement => {
  return (
    <CustomCol key={id} span={span} radius={5}>
      <div className="content">
        <img
          height={200}
          alt="img alt"
          width={'100%'}
          onError={onErrorHandler}
          src={Env.PURE_URL + imagePath}
          style={{ objectFit: 'cover' }}
        />
        <Button block>
          <a href={Env.PURE_URL + filePath} target="_blank" download>
            {i18n.t('Global.Download')}
          </a>
        </Button>
      </div>
    </CustomCol>
  );
};

export default FilePreview;

const CustomCol = styled(Col)<{ radius?: number }>`
  & .content {
    border: 1px solid #e8e8e8;
    border-radius: ${({ radius }) => `${radius}px`};
    & > img {
      border-radius: ${({ radius }) => `${radius}px ${radius}px 0 0`};
    }
    & > button {
      border-radius: ${({ radius }) => `0 0 ${radius}px ${radius}px`};
    }
  }
`;
