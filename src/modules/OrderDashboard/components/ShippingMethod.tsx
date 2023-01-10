import { shippingAtom } from '@modules/OrderDashboard/Atom';
import { getShippingMethods } from '@modules/OrderDashboard/services/shippingMethods.service';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

const ShippingMethod: FC = () => {
  const { data: shippingMethods, isLoading } = useQuery(['shipping-methods'], () => getShippingMethods());
  const { t } = useTranslation();
  const { Title } = Typography;
  const [, setShippingMethod] = useAtom(shippingAtom);
  const handleChange = (value: string) => {
    setShippingMethod(value);
  };

  const shippingOptions = useMemo(() => {
    return shippingMethods?.data?.map((method) => {
      return {
        value: method.id,
        label: method?.name,
      };
    });
  }, [shippingMethods]);
  return (
    <Row>
      <Col span={6}>
        <Title level={5}>{t('OrderDashboard.ShippingMethod')}:</Title>
      </Col>
      <Col span={12}>
        <Select
          notFoundContent={isLoading ? <Spin size="small" /> : null}
          placeholder="Choose Shipping Method"
          onChange={handleChange}
          style={{ width: '100%' }}
          options={shippingOptions}
        />
      </Col>
    </Row>
  );
};
export default ShippingMethod;
