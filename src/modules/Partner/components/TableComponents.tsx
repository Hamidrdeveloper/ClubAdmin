import { DashboardOutlined, EyeOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Space, Tag } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';

export const TreeLink = (id: number): ReactElement => {
  const { role } = useContext(AuthContext);

  return (
    <>
      {role !== 'partner' && (
        <Space>
          <Link to={`/admin/partner/list/tree/${id}`}>
            <Tag color="magenta">
              <EyeOutlined />
              <span>Partner Tree</span>
            </Tag>
          </Link>

          <Link to={`/admin/dashboard/partner/${id}`}>
            <Tag color="magenta">
              <DashboardOutlined />
              <span>Dashboard</span>
            </Tag>
          </Link>
        </Space>
      )}
    </>
  );
};
