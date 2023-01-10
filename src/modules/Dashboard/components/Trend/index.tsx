import './index.less';

import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';

export type TrendProps = {
  colorful?: boolean;
  flag: 'up' | 'down';
  className?: string;
  reverseColor?: boolean;
  style?: React.CSSProperties;
};

const Trend: React.FC<TrendProps> = ({
  flag,
  children,
  className,
  colorful = true,
  reverseColor = false,
  ...rest
}) => {
  const classString = classNames(
    'trendItem',
    {
      trendItemGrey: !colorful,
      reverseColor: reverseColor && colorful,
    },
    className,
  );
  return (
    <div {...rest} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && (
        <span className={flag === 'up' ? 'up' : 'down'}>
          {flag === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}
        </span>
      )}
    </div>
  );
};

export default Trend;
