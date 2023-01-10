import { LoadingOutlined } from '@ant-design/icons';
import { addressAtom, paymentAtom, productAtom, shippingAtom, userAtom } from '@modules/OrderDashboard/Atom';
import SearchProduct from '@modules/OrderDashboard/components/SearchProduct';
import SearchUser from '@modules/OrderDashboard/components/SearchUser';
import ShippingMethod from '@modules/OrderDashboard/components/ShippingMethod';
import { Container } from '@modules/OrderDashboard/pages/OrderDashboard.style';
import { bulkAdd, finalizeOrder } from '@modules/OrderDashboard/services/checkout.service';
import { getUserConfig } from '@modules/OrderDashboard/services/user.service';
import { intlCurrency } from '@shared/utils/engine.service';
import { Button, Card, Col, Divider, Row, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import { reduce } from 'lodash';
import { sumBy } from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';

import PaymentMethod from '../components/PaymentMethod';
import ProductTable from '../components/ProductTable';
import SearchAddress from '../components/SearchAddress';

const OrderDashboard: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { Title } = Typography;
  const [checkoutEnable, setCheckoutEnable] = useState(false);
  const [user] = useAtom(userAtom);
  const [address] = useAtom(addressAtom);
  const [products] = useAtom(productAtom);
  const [shippingMethod] = useAtom(shippingAtom);
  const [paymentMethod] = useAtom(paymentAtom);
  const { mutate: addBulk, isLoading: addBulkLoading } = useMutation(bulkAdd, {
    onSuccess: () => setCheckoutEnable(true),
  });
  const { mutate: finalize, isLoading: finalizeLoading } = useMutation(finalizeOrder);
  const { data: userConfig } = useQuery(['config', user], getUserConfig);
  console.log(finalizeLoading, 'finalizeLoading');
  const minimumShippingCostPartner = userConfig?.data?.transportation_rule?.min_partner_amount;
  const maximumCustomerShippingCost = userConfig?.data?.shipping_cost_rule?.amount;
  const customerMinAmount = userConfig?.data?.shipping_cost_rule?.min_amount;

  const [finalShippingCost, setFinalShippingCost] = useState<any>(0);
  const [finalDiscount, setFinalDiscount] = useState<any>();

  const partnerShipping =
    finalShippingCost < minimumShippingCostPartner! ? minimumShippingCostPartner : finalShippingCost;
  const totalPrices = products.map((P) => {
    return {
      net: (P.product.sale_price?.value_after_discount || 0) * P.count,
    };
  });
  const customerShipping = sumBy(totalPrices, 'net') < customerMinAmount! ? maximumCustomerShippingCost! : 0;
  useMemo(() => {
    const discountArray: number[] = [];
    const shippingArray: (number | undefined)[] = [];
    if (products) {
      for (const item of products) {
        const discount: number = parseInt(
          (item.product?.sale_price?.value - item.product?.sale_price?.value_after_discount).toFixed(2),
        );
        const shippingCost: number | undefined = item.product?.transportation?.value;
        discountArray.push(discount);
        shippingArray.push(shippingCost);
      }
    }
    !!shippingArray.length && setFinalShippingCost(shippingArray?.reduce((a, b) => a! + b!));
    !!discountArray.length && setFinalDiscount(discountArray?.reduce((a, b) => a + b));
  }, [products]);

  function addBulkHandle() {
    const arrayOfVariations: { count: number; product_variation_id: number }[] = [];
    if (products)
      for (const item of products) {
        arrayOfVariations.push({
          count: 1,
          product_variation_id: item?.id,
        });
      }
    const body: any = { items: arrayOfVariations, user_id: user?.id };
    addBulk(body);
  }

  function finalizeOrderHandle() {
    const body: any = {
      // description: 'order from dashboard',
      payment_method_id: paymentMethod,
      shipping_profile_id: shippingMethod,
      invoice_contact_group_id: address ? parseInt(address['invoice'][1]) : '',
      delivery_contact_group_id: address ? parseInt(address['delivery'][1]) : '',
      user_id: user?.id,
    };
    finalize(body, {
      onSuccess: (response) => {
        console.log(response, 'response');
        // @ts-ignore
        navigate(`/admin/orders/order-sale/${response?.data?.orderSale.id}`);
      },
    });
  }

  return (
    <Container>
      <Card>
        <Row>
          <Col span={12}>
            <SearchUser />
            {user && (
              <Row>
                <Col span={5}>
                  <Title level={5}>{t('OrderDashboard.Info')}:</Title>
                </Col>
                <Col span={14}>
                  <Card bordered title={<h4>{`${user?.partner ? 'Partner' : 'Customer'} Info`}</h4>}>
                    {user?.partner ? (
                      <div>
                        <div style={{ display: 'flex', width: '440px', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> First Name: </span>
                            <span>{user?.person?.first_name} </span>
                          </div>
                          <div></div>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> Last Name: </span>
                            <span> {user?.person?.last_name}</span>
                          </div>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> ID: </span>
                            <span> {user?.person?.id}</span>
                          </div>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Career Step : </span>
                          <span> {user?.careerStep?.slug} </span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Sponsor: </span>
                          <span>{user?.sponsor?.bank_name} </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ display: 'flex', width: '355px', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> First Name: </span>
                            <span>{user?.person?.first_name} </span>
                          </div>
                          <div></div>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> Last Name: </span>
                            <span> {user?.person?.last_name}</span>
                          </div>
                          <div>
                            <span style={{ fontWeight: 'bold' }}> ID: </span>
                            <span> {user?.person?.id}</span>
                          </div>
                        </div>
                        <div>
                          <span style={{ fontWeight: 'bold' }}>Discount: </span>
                          <span>{user?.discount_ratio}% </span>
                        </div>
                        <span style={{ fontWeight: 'bold' }}>Sponsor: </span>
                        <span>{user?.sponsor?.bank_name} </span>
                      </div>
                    )}
                  </Card>
                </Col>
              </Row>
            )}
            <SearchAddress isPartner={!!user?.partner} />
            <SearchProduct />
          </Col>
          <Col span={12}>
            <Row justify="space-around">
              <Col span={10}>
                <Card title={t('OrderDashboard.Invoice')} bordered style={{ minHeight: '100px' }}>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(address?.['invoice']?.[2]) }} />
                </Card>
              </Col>
              <Col span={10}>
                <Card title={t('OrderDashboard.Delivery')} bordered style={{ minHeight: '100px' }}>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(address?.['delivery']?.[2]) }} />
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <ProductTable />
      <Divider orientation="left">{t('OrderDashboard.FinalizeOrder')}</Divider>
      <Card>
        <Row>
          <Col span={10}>
            <PaymentMethod />
            <ShippingMethod />
          </Col>
          <Col span={8}>
            <Card title={t('OrderDashboard.Summary')} bordered style={{ width: 300 }}>
              <p>
                {t('OrderDashboard.Total')} :
                {reduce(
                  products.map((el) => el.count),
                  (sum, n) => sum + n,
                  0,
                )}
              </p>
              <p>
                {t('OrderDashboard.ShippingCost')} :
                {intlCurrency(
                  address?.currency?.iso3 ?? 'EUR',
                  (user?.partner ? partnerShipping : customerShipping) ?? 0,
                )}
              </p>
              <p>
                {t('OrderDashboard.Discount')} :
                {intlCurrency(address?.currency?.iso3 ?? 'EUR', finalDiscount ?? 0)}
              </p>
              {user?.partner && (
                <p>
                  {' '}
                  {t('OrderDashboard.CareerStepDiscount')} :{user?.careerStep?.discount_percentage || 0} %
                </p>
              )}
              {user?.partner && (
                <p>
                  {t('OrderDashboard.PartnerDiscount')} : {user?.discount_ratio || 0}%{' '}
                </p>
              )}
              {user?.partner && (
                <p>
                  {t('OrderDashboard.CareerStepBonus')} : {user?.careerStep?.voucher_level}{' '}
                </p>
              )}
            </Card>
          </Col>
          <Col span={4} style={{ margin: '20px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Button type="primary" onClick={addBulkHandle} style={{ minWidth: '150px' }}>
                {addBulkLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
                ) : (
                  t('OrderDashboard.AddBulk')
                )}
              </Button>
            </div>
            <div>
              <Button
                disabled={!checkoutEnable}
                onClick={finalizeOrderHandle}
                type="primary"
                style={{ minWidth: '150px' }}
              >
                {finalizeLoading ? (
                  <Spin indicator={<LoadingOutlined style={{ fontSize: 24, color: '#fff' }} spin />} />
                ) : (
                  t('OrderDashboard.Checkout')
                )}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default OrderDashboard;
