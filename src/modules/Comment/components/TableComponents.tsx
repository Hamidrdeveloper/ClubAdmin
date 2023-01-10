import { UserOutlined } from '@ant-design/icons';
import { User } from '@src/core/Authentication/model';
import Env from '@src/core/Configs/ConfigureEnv';
import { Avatar, Space, Tooltip } from 'antd';
import React, { FC, ReactElement } from 'react';

export const NameRenderer: React.FC<{ name: string }> = ({ name }) => {
  return (
    <Tooltip placement="topLeft" title={name}>
      {name}
    </Tooltip>
  );
};

export const AvatarRender = (user: Partial<User>): ReactElement => (
  <Space>
    <Avatar src={Env.BASE_URL + user.avatar} icon={<UserOutlined />} />
    {user.username}
  </Space>
);

export const NullRenderer: FC<string | number | null> = (data) => {
  if (!data) return <span>-</span>;
  else return <span>data</span>;
};
