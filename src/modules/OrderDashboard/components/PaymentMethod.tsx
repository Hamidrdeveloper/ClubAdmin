import { paymentAtom, userAtom } from '@modules/OrderDashboard/Atom';
import { getPaymentMethods } from '@modules/OrderDashboard/services/paymentMethods.service';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

const PaymentMethod: FC = () => {
  const [user] = useAtom(userAtom);
  const countryId = user?.invoiceContactGroup?.address?.country?.id;
  const currencyId = user?.invoiceContactGroup?.address?.country?.currency?.id;
  const { data: paymentMethods, isLoading } = useQuery(['payment-methods', user], () =>
    getPaymentMethods(countryId, currencyId),
  );

  const { t } = useTranslation();
  const [, setPaymentMethod] = useAtom(paymentAtom);
  const { Title, Text } = Typography;
  const paymentOptions = useMemo(() => {
    return paymentMethods?.data?.map((method) => {
      return {
        value: method.id,
        label: method?.name,
      };
    });
  }, [paymentMethods]);

  const handleChange = (value: string) => {
    setPaymentMethod(value);
  };
  return (
    <Row>
      <Col span={6}>
        <Title level={5}>{t('OrderDashboard.PaymentMethod')}:</Title>
      </Col>
      <Col span={12}>
        <Select
          notFoundContent={isLoading ? <Spin size="small" /> : <Text type="warning">no item !</Text>}
          onChange={handleChange}
          placeholder="Choose Payment Method"
          style={{ width: '100%' }}
          options={paymentOptions}
        />
      </Col>
    </Row>
  );
};
export default PaymentMethod;
