import { Col, Row, Space } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PartnerSalePositionModel } from '../..';
import SinglePosition from './SinglePosition';

type Props = {
  positions: PartnerSalePositionModel[];
};
export const OrderPositionAll = ({ positions }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Row className="header">
        <Col span={2} className="title">
          <Row align="middle">
            <span>{t('Order.Position.Item')}</span>
          </Row>
        </Col>

        <Col span={3} className="title">
          <Row align="middle">
            <span>{t('Order.Position.Quantity')}</span>
          </Row>
        </Col>

        <Col span={6} className="title">
          <Row align="middle">
            <span>{t('Order.Position.ItemText')} </span>
          </Row>
        </Col>

        <Col span={3} className="title">
          <Row align="middle">
            <span>{t('Order.Position.PriceBracketNet')}</span>
          </Row>
        </Col>

        <Col span={3} className="title">
          <Row align="middle">
            <span>{t('Order.Position.Vat')} </span>
          </Row>
        </Col>

        <Col span={3} className="title">
          <Row align="middle">
            <span>{t('Order.Position.PriceBracketGross')}</span>
          </Row>
        </Col>
      </Row>
      {/* TODO: Add Pagination for Positions */}
      <Space direction="vertical" className="positions" style={{ paddingBlock: '0', gap: '0' }}>
        {positions?.map((position) => (
          <SinglePosition key={position.id} order={position} />
        ))}
      </Space>
    </>
  );
};
