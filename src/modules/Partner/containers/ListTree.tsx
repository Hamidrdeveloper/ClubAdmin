import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import SortableTree from '@nosferatu500/react-sortable-tree';
import { Col, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import GraphSingleCard from '../components/GraphSingleCard';
import { SinglePartnerTree } from '../model/partnerTree.entity';
import PartnerModal from './PartnerModal';

type Props = { parent: SinglePartnerTree };
const ListTree: React.FC<Props> = ({ parent }) => {
  const [isVisible, setVisible] = useState(false);
  const [partnerId, setPartnerId] = useState<number>();
  const [treeData, setTreeData] = useState<SinglePartnerTree[]>([]);

  const handleOpenModal = (id: number) => {
    setVisible(true);
    setPartnerId(id);
  };

  useEffect(() => {
    if (parent && parent.children.length > 0) {
      setTreeData(parent.children);
    }
  }, [parent]);

  return (
    <MainContainer>
      <div className={`single-partner ${parent.children.length > 0 ? 'has-child' : ''}`}>
        <GraphSingleCard data={parent} openModal={handleOpenModal} />
      </div>
      {parent.children.length > 0 && (
        <SortableTree
          treeData={treeData}
          canDrag={() => false}
          getNodeKey={({ node: { id } }) => id}
          generateNodeProps={({ node }) => {
            return {
              style: {
                minWidth: '420px',
                borderRadius: '4px',
                background: '#F5FBFF',
                border: '1px solid #C9E9FF',
              },
              title: (
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <UserOutlined />
                      <span>
                        <span>{node.fullName}</span>&nbsp;
                        <span>({node.id})</span>&nbsp;
                        {node.level && <span>({node.level})</span>}
                      </span>
                    </Space>
                  </Col>

                  <Col>
                    <div className="info" onClick={() => handleOpenModal(node.userId)}>
                      <InfoCircleOutlined style={{ fontSize: '18px' }} />
                    </div>
                  </Col>
                </Row>
              ),
            };
          }}
          onChange={(treeData) => setTreeData(treeData)}
        />
      )}

      {partnerId && <PartnerModal userId={partnerId} isVisible={isVisible} setVisible={setVisible} />}
    </MainContainer>
  );
};

export default ListTree;

const MainContainer = styled.div`
  height: 100vh;
  padding: 24px;

  & .rst__rowLabel {
    width: 100%;

    & .info {
      display: flex;
      cursor: pointer;
    }
  }

  & .single-partner {
    padding-left: 45px;
    padding-bottom: 20px;
    position: relative;

    &.has-child {
      &::before {
        content: '';
        position: absolute;
        left: 25px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 1px;
        background: linear-gradient(to right, transparent 50%, #fff 50%),
          linear-gradient(to right, #009ddc, #fff);
        background-size: 16px 2px, 16px 100%;
      }

      &::after {
        content: '';
        position: absolute;
        left: 22px;
        top: 50%;
        width: 1px;
        height: 75%;
        background: linear-gradient(to bottom, transparent 50%, #fff 50%),
          linear-gradient(to bottom, #009ddc, #fff);
        background-size: 2px 16px, 100% 16px;
      }
    }
  }
`;
