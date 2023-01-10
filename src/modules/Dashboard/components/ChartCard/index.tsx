import './index.less';

import { Card } from 'antd';
import type { CardProps } from 'antd/es/card';
import classNames from 'classnames';
import React from 'react';

type totalType = () => React.ReactNode;

const renderTotal = (total?: number | totalType | React.ReactNode) => {
  if (!total && total !== 0) {
    return null;
  }
  let totalDom: React.ReactNode | null;

  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div className="total">{total()}</div>;
      break;
    default:
      totalDom = <div className="total">{total}</div>;
  }
  return totalDom;
};

export type ChartCardProps = {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
} & CardProps;

class ChartCard extends React.Component<ChartCardProps> {
  renderContent = (): JSX.Element | null => {
    const { contentHeight, avatar, action, total, footer, children, loading } = this.props;

    if (loading) {
      return null;
    }
    return (
      <div className="chartCard">
        <div
          className={classNames('chartTop', {
            chartTopMargin: !children && !footer,
          })}
        >
          <div className="avatar">{avatar}</div>
          <div className="metaWrap">
            {action && (
              <div className="meta">
                <span className="action">{action}</span>
              </div>
            )}
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div className="content" style={{ height: contentHeight || 'auto' }}>
            <div className={contentHeight ? 'contentFixed' : ''}>{children}</div>
          </div>
        )}
        {footer && <div className={classNames('footer', { ['footerMargin']: !children })}>{footer}</div>}
      </div>
    );
  };

  render(): React.ReactNode {
    const { loading = false, title } = this.props;
    return (
      <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} title={title}>
        {this.renderContent()}
      </Card>
    );
  }
}

export default ChartCard;
