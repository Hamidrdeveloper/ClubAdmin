import { Loader } from '@src/shared/components';
import { Button, Col, Row, Space, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { RawNodeDatum } from 'react-d3-tree/lib/types/common';
import { useTranslation } from 'react-i18next';
import { Params, useParams } from 'react-router-dom';
import styled from 'styled-components';

import GraphFilter from '../components/GraphFilter';
import { SinglePartnerTree } from '../model/partnerTree.entity';
import { getUserDescendants } from '../service/partner.service';
import GraphTree from './GraphTree';
import PartnerListTree from './ListTree';

// const colors = ['', '#38B153', '#009DDC', '#F7617D', '#38B153'];

type Props = { partner?: number };
const PartnerGraph: React.FC<Props> = ({ partner }) => {
  const depth = 4;
  const params: Params<string> = useParams();
  const [treeType, setTreeType] = useState('list');
  const [pageType, setPageType] = useState('graph');
  const [isPending, setPending] = useState<boolean>(true);
  const [parentTree, setParentTree] = useState<SinglePartnerTree>();
  const [orgChart, setOrgChart] = useState<RawNodeDatum>({} as RawNodeDatum);
  const { t } = useTranslation();

  useEffect(() => {
    if (params.partner_id || partner) {
      getPartnerTree(depth);
    }
  }, [params.partner_id, partner, depth]);

  const getPartnerTree = (depth: number) => {
    const partnerId = params.partner_id ? Number(params.partner_id) : partner || 0;
    getUserDescendants({ depth, partnerId: partnerId }).then(({ fullData, singleData }) => {
      setPending(false);
      setOrgChart(fullData);
      setParentTree(singleData);
    });
  };

  // const onRaiseDepth = () => {
  //   setPending(true);
  //   setDepth((prev) => prev + 1);
  // };

  return (
    <Row>
      <MainContainer>
        <ActionsContainer>
          <Space>
            <Button
              size="large"
              type="primary"
              ghost={pageType !== 'graph'}
              onClick={() => setPageType('graph')}
            >
              {t('Global.graphSheet')}
            </Button>
            <Button size="large" type="primary" ghost={pageType !== 'dot'} onClick={() => setPageType('dot')}>
              {t('Partner.Field.DotSheet')}
            </Button>
            <Button
              size="large"
              type="primary"
              ghost={pageType !== 'white'}
              onClick={() => setPageType('white')}
            >
              {t('Partner.Field.WhiteSheet')}
            </Button>
          </Space>

          <GraphFilter treeType={treeType} onChangeTreeType={(value) => setTreeType(value)} />
        </ActionsContainer>

        <TreeContainer className={pageType}>
          <TitleContainer>
            <Space size="large">
              <Typography.Title level={2} className="title">
                {t('Global.TreeGenealogy')}
              </Typography.Title>

              {/* <Button ghost type="primary" onClick={onRaiseDepth} loading={isPending}>
                Load More Levels (Level : {depth})
              </Button> */}
            </Space>

            {/* <div className="info">
              <Typography.Text>
                <TeamOutlined style={{ marginRight: 4 }} />
                Karriereschritt
              </Typography.Text>

              <div className="list">
                {colors.slice(1).map((color, index) => (
                  <div className="single" key={`color-${index}`}>
                    <span style={{ color }}>&#8226;</span>
                    <span>E{index + 1}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </TitleContainer>

          {isPending ? (
            <Loader />
          ) : (
            <>
              {treeType === 'graph' && orgChart && <GraphTree data={orgChart} />}
              {treeType === 'list' && parentTree && (
                <Row style={{ marginTop: 100 }} justify="space-between">
                  <Col>
                    <PartnerListTree parent={parentTree} />
                  </Col>
                  {/* <Col>
                    <PartnerRanking />
                  </Col> */}
                </Row>
              )}
            </>
          )}
        </TreeContainer>
      </MainContainer>
    </Row>
  );
};

export default PartnerGraph;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .title {
    margin: 0;
  }

  & .info {
    display: flex;
    align-items: center;
    padding: 8px;
    color: #4a5161;
    background: #fff;
    border: 1px solid #009ddc;

    & .list {
      display: flex;
      margin-left: 16px;
      align-items: center;
      gap: 16px;

      & .single {
        display: flex;
        align-items: center;

        & span:first-child {
          height: 15px;
          display: flex;
          align-items: center;
          font-size: 2.5rem;
          margin-right: 4px;
        }
      }
    }
  }
`;

const TreeContainer = styled.div`
  width: 100%;
  min-height: 140vh;
  margin-top: 16px;
  border-radius: 4px;
  position: relative;
  z-index: 1;
  border: 1px solid #aaaaaa;
  padding-bottom: 32px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  &.white::after {
    background: #fff;
  }

  &.dot::after {
    background-size: 30px 30px;
    background-image: radial-gradient(circle, #bebebe 1px, rgba(0, 0, 0, 0) 1px);
  }

  &.graph,
  &.white,
  &.dot {
    height: 100vh;
  }

  &.graph::after {
    opacity: 0.08;
    background: url('http://i.stack.imgur.com/GySvQ.png');
  }

  & .partner-tree {
    & path.rd3t-link {
      stroke-dasharray: 6;
      stroke: #009ddc;
    }

    & circle {
      fill: #009ddc;
      stroke: #009ddc;
    }
  }
`;

const MainContainer = styled.div`
  width: 100%;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  margin-top: 16px;
`;
