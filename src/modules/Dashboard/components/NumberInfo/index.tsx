import './index.less';

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

export type NumberInfoProps = {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  status?: 'up' | 'down';
  theme?: string;
  gap?: number;
  subTotal?: number;
  suffix?: string;
  style?: React.CSSProperties;
};

const NumberInfo: React.FC<NumberInfoProps> = ({
  theme,
  title,
  subTitle,
  total,
  subTotal,
  status,
  suffix,
  gap,
  ...rest
}) => (
  <div
    className={classNames('numberInfo', {
      [`numberInfo${theme}`]: theme,
    })}
    {...rest}
  >
    {title && (
      <div className="numberInfoTitle" title={typeof title === 'string' ? title : ''}>
        {title}
      </div>
    )}
    {subTitle && (
      <div className="numberInfoSubTitle" title={typeof subTitle === 'string' ? subTitle : ''}>
        {subTitle}
      </div>
    )}
    <div className="numberInfoValue" style={gap ? { marginTop: gap } : {}}>
      <span>
        {total}
        {suffix && <em className="suffix">{suffix}</em>}
      </span>
      {(status || subTotal) && (
        <span className="subTotal">
          {subTotal}
          {status && status === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  </div>
);

export default NumberInfo;
