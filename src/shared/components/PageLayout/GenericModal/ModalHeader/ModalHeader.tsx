import { ArrowLeftOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import Styles from './ModalHeader.style';
import { ModalHeaderProps } from './ModalHeader.type';

export default function ModalHeader({ title, onClose, items, hideBackBtn }: ModalHeaderProps): ReactElement {
  return (
    <Styles.MainContainer>
      <Space align="baseline">
        {!hideBackBtn && <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => onClose?.()} />}

        {title && <Typography className="title">{title}</Typography>}

        {items && (
          <div className="breadcumb">
            <Breadcrumb>
              {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                  <Breadcrumb.Item key={`breadcrumb-${index}`}>
                    {isLast ? (
                      item.breadcrumbName
                    ) : (
                      <Link to={item.path} onClick={() => onClose?.()}>
                        {item.breadcrumbName}
                      </Link>
                    )}
                  </Breadcrumb.Item>
                );
              })}
            </Breadcrumb>
          </div>
        )}
      </Space>
    </Styles.MainContainer>
  );
}
