import { Env } from '@src/core';
import { intlCurrency } from '@src/shared/utils/engine.service';
import { Avatar, Col, List, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Partner } from '../model/partner.entity';
import { getPartnerRanking } from '../service/partner.service';

const PartnerRanking: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    getPartnerRanking().then((partners) => {
      setPartners(partners);
    });
  }, []);

  return (
    <MainContainer>
      {partners.length > 0 && (
        <>
          <div className="header">
            <Row justify="space-between" align="middle">
              <Col>
                <Typography.Title level={3}>Top 5 Partners</Typography.Title>
              </Col>

              <Col>
                <img src="/assets/images/user/rank.png" alt="rank-image" />
              </Col>
            </Row>
          </div>
          <List
            itemLayout="horizontal"
            dataSource={partners}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={<a>{item.user.person.full_name}</a>}
                  avatar={<Avatar src={item.user.avatar ? Env.PURE_URL + item.user.avatar : null} />}
                  description={
                    <Typography.Text strong style={{ fontSize: 16 }}>
                      <span>Level : </span>
                      {item.partners_count}
                    </Typography.Text>
                  }
                />

                <Typography.Title level={5} style={{ color: '#38B153' }}>
                  {intlCurrency('EUR', 12000)}
                </Typography.Title>
              </List.Item>
            )}
          />
        </>
      )}
    </MainContainer>
  );
};

export default PartnerRanking;

const MainContainer = styled.div`
  min-width: 400px;
  background-color: #fff;
  border: 1px solid #009ddc;
  border-radius: 4px;
  padding: 16px;
  margin-right: 16px;

  & .header {
    margin-bottom: 8px;
  }
`;
