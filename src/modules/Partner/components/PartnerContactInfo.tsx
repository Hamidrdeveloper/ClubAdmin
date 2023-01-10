// NOTE: We are not using this file anymore. due to contact info rework from backend
import { User } from '@src/modules/User';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

const PartnerContactInfo: React.FC<{ user: User }> = ({ user }) => {
  const lastIndex = user.person.contactGroups.length - 1;

  return (
    <MainContainer>
      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>Title</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>
            {user.person.contactGroups[lastIndex].title}
          </Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>Country</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>
            {user.person.contactGroups[lastIndex].country.name}
          </Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>Address</Typography.Text>
        </Col>
        <Col span={12}>
          <div
            style={{ color: '#9D9D9D' }}
            dangerouslySetInnerHTML={{
              __html: user.person.contactGroups[lastIndex].address.address_complete,
            }}
          />
        </Col>
      </Row>
    </MainContainer>
  );
};

export default PartnerContactInfo;

const MainContainer = styled.div`
  & .single {
    padding: 8px 0;
  }
`;
