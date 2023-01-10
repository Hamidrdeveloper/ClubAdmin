import { User } from '@src/modules/User';
import { Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PartnerUserInfo: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation();
  return (
    <MainContainer>
      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.Username')} </Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.username}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.FirstName')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.person.first_name}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.LastName')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.person.last_name}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>Gender</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.person.gender}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.Email')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.email}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Partner.Field.Company')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.person.company_name}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.Country')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.country?.name ?? ' - '}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('Global.Language')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.language.title}</Typography.Text>
        </Col>
      </Row>

      {user.sponsor_id && (
        <Row className="single">
          <Col span={12}>
            <Typography.Text strong>{t('User.Field.Sponsor')}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ color: '#9D9D9D' }}>
              {user?.sponsor?.user?.person?.full_name}
            </Typography.Text>
          </Col>
        </Row>
      )}

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('User.Field.TaxNumber')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.tax_number ?? '-'}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('User.Field.VatNumber')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.vat_number ?? '-'}</Typography.Text>
        </Col>
      </Row>

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('User.Field.EoriNumber')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.eori_number ?? '-'}</Typography.Text>
        </Col>
      </Row>

      {user.paymentMethod && (
        <Row className="single">
          <Col span={12}>
            <Typography.Text strong>{t('User.Field.DefaultPaymentTerm')}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ color: '#9D9D9D' }}>
              {user.paymentMethod?.name ?? ' - '}
            </Typography.Text>
          </Col>
        </Row>
      )}

      {user.shippingMethod && (
        <Row className="single">
          <Col span={12}>
            <Typography.Text strong>{t('User.Field.DefaultShippingMethod')}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ color: '#9D9D9D' }}>
              {user.shippingMethod?.name ?? ' - '}
            </Typography.Text>
          </Col>
        </Row>
      )}

      {user.paymentTerm && (
        <Row className="single">
          <Col span={12}>
            <Typography.Text strong>{t('User.Field.DefaultPaymentTerm')}</Typography.Text>
          </Col>
          <Col span={12}>
            <Typography.Text style={{ color: '#9D9D9D' }}>{user.paymentTerm.description}</Typography.Text>
          </Col>
        </Row>
      )}

      <Row className="single">
        <Col span={12}>
          <Typography.Text strong>{t('User.Field.UserDiscount')}</Typography.Text>
        </Col>
        <Col span={12}>
          <Typography.Text style={{ color: '#9D9D9D' }}>{user.discount_ratio}</Typography.Text>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default PartnerUserInfo;

const MainContainer = styled.div`
  & .single {
    padding: 8px 0;
  }
`;
