import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleOutlined,
  MoreOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Dropdown, Menu, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import cn from 'classnames';
import React from 'react';
import { TreeNodeDatum } from 'react-d3-tree/lib/types/common';
import styled from 'styled-components';

const colors = ['', '#38B153', '#009DDC', '#F7617D', '#38B153', '#FF8F78', '#991b2a'];
type Props = { nodeData: TreeNodeDatum; toggleNode?: () => void; openModal: (id: number) => void };

const GraphCard: React.FC<Props> = ({ nodeData, toggleNode, openModal }) => {
  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => openModal(nodeData.attributes?.id as number)}>
        Show Partner Info
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <circle r={6}></circle>

      <foreignObject {...{ width: 350, height: 250, x: -175, y: 25 }}>
        <Card color={colors[nodeData.attributes?.level ? Number(nodeData.attributes?.level[0]) : 1]}>
          {(nodeData.children || []).length > 0 && (
            <>
              {nodeData.__rd3t.collapsed ? (
                <div className="add-container" onClick={toggleNode}>
                  <PlusCircleOutlined />
                </div>
              ) : (
                <div className="add-container" onClick={toggleNode}>
                  <MinusCircleOutlined />
                </div>
              )}
            </>
          )}

          <div className="more-container">
            <Dropdown overlay={menu} trigger={['click']}>
              <MoreOutlined className="more-icon" />
            </Dropdown>
          </div>
          <div className="avatar">
            <Avatar className="avatar-img" src={nodeData.attributes?.avatar} />

            <div className={cn('status', { inactive: !nodeData.attributes?.active })}>
              {nodeData.attributes?.active ? (
                <>
                  <CheckCircleFilled /> <span>Active</span>
                </>
              ) : (
                <>
                  <CloseCircleFilled /> <span style={{ fontSize: 12 }}>Not Active</span>
                </>
              )}
            </div>
          </div>

          <div className="description">
            <Typography.Text strong>{nodeData.name}</Typography.Text>

            {nodeData.attributes?.level && (
              <div className="level">
                <Typography.Text>{nodeData.attributes?.level}</Typography.Text>
              </div>
            )}

            <div className="info">
              {String(nodeData.attributes?.sponsor).trim() !== '' && (
                <Typography.Text type="secondary">Sponsor : {nodeData.attributes?.sponsor}</Typography.Text>
              )}
              {String(nodeData.attributes?.coach).trim() !== '' && (
                <Typography.Text type="secondary">Coach : {nodeData.attributes?.coach}</Typography.Text>
              )}
            </div>

            <div className="email">
              <Typography.Text>{nodeData.attributes?.email}</Typography.Text>
            </div>
          </div>
        </Card>
      </foreignObject>
    </React.Fragment>
  );
};

const Card = styled.div<{ color: string }>`
  width: 350px;
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

export default GraphCard;
