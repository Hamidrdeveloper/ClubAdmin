import { CheckCircleFilled, CloseCircleFilled, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import cn from 'classnames';
import React from 'react';
import styled from 'styled-components';

import { SinglePartnerTree } from '../model/partnerTree.entity';

const colors = ['', '#38B153', '#009DDC', '#F7617D', '#38B153', '#FF8F78', '#991b2a'];
type Props = { data: SinglePartnerTree; openModal: (id: number) => void };

const GraphSingleCard: React.FC<Props> = ({ data, openModal }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => openModal(data.userId)}>
        Show Partner Info
      </Menu.Item>
    </Menu>
  );

  return (
    <Card color={colors[data.level ? Number(data.level[0]) : 1]}>
      <div className="more-container">
        <Dropdown overlay={menu} trigger={['click']}>
          <MoreOutlined className="more-icon" />
        </Dropdown>
      </div>
      <div className="avatar">
        <Avatar className="avatar-img" src={data.avatar} />

        <div className={cn('status', { inactive: !data.active })}>
          {data.active ? (
            <>
              <CheckCircleFilled /> <span>Active</span>
            </>
          ) : (
            <>
              <CloseCircleFilled /> <span>Not Active</span>
            </>
          )}
        </div>
      </div>

      <div className="description">
        <Typography.Text strong>{data.fullName}</Typography.Text>

        <div className="level">
          <Typography.Text>{data.level}</Typography.Text>
        </div>

        <div className="info">
          {String(data.sponsorFullName).trim() !== '' && (
            <Typography.Text type="secondary">Sponsor : {data.sponsorFullName}</Typography.Text>
          )}
          {String(data.coachFullName).trim() !== '' && (
            <Typography.Text type="secondary">Coach : {data.coachFullName}</Typography.Text>
          )}
        </div>

        <div className="email">
          <Typography.Text>{data.email}</Typography.Text>
        </div>
      </div>
    </Card>
  );
};

const Card = styled.div<{ color: string }>`
  width: 420px;
  display: flex;
  gap: 16px;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  position: relative;
  border: 1px solid ${(props) => props.color};

  & .add-container {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.5rem;
    background: #fff;
    border-radius: 50%;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 4px;
    background: ${(props) => props.color};
  }

  & .more-container {
    position: absolute;
    right: 16px;
    top: 16px;

    & .more-icon {
      font-size: 1.2rem;
    }
  }

  & .avatar {
    text-align: center;

    & .avatar-img {
      width: 80px;
      height: 80px;
      border: 1px solid #9d9d9d;
    }

    & .status {
      padding: 8px 0;
      color: green;

      &.inactive {
        color: red;
      }
    }
  }

  & .description,
  & .info {
    display: flex;
    flex-direction: column;
  }

  & .name {
    font-size: 1.1rem;
  }

  & .info {
    padding: 8px 0;
  }
`;

export default GraphSingleCard;
