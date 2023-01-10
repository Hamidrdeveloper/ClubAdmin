import {
  CarryOutOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  FilePdfOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { Button, Col, Input, Row, Space, Tooltip, message, notification } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';

import {
  callShipping,
  generatePackListDocument,
  removePacking,
  trackingLink,
  updateTrackingNumber,
} from '../../services/order.service';
import { OrderDetailTabs, OrderPacking } from '../..';
import { EditButtonContainer } from '../EditableText';

interface Props {
  orderPacking: OrderPacking;
  updateTab: (type: OrderDetailTabs) => void;
}

function OrderSettingPackingOptions({ orderPacking: { id, number }, updateTab }: Props): ReactElement {
  const [pending, setPending] = useState<
    'Edit' | 'Double' | 'Call' | 'Link' | 'Remove' | 'PackList' | 'None'
  >('None');
  const [trackingCode, setTrackingCode] = useState<string>(number);

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  //
  return (
    <Row>
      <Col span={10}>
        <Input
          disabled={isOrderReadOnly}
          placeholder={
            number ? i18n.t('Order.Delivery.TrackingCodePlaceholder') : i18n.t('Order.Delivery.TrackingCode')
          }
          value={trackingCode}
          onChange={(value) => setTrackingCode(value.target.value)}
        />
      </Col>

      <Col offset={1} span={13}>
        <Space direction="horizontal">
          <EditButtonContainer>
            <Tooltip title={i18n.t('Order.Delivery.EditTrackingCode')}>
              <Button
                disabled={isOrderReadOnly}
                icon={<CheckOutlined />}
                size="small"
                type="ghost"
                loading={pending === 'Edit'}
                onClick={() => {
                  if (trackingCode === '') {
                    message.error(i18n.t('Order.Delivery.EditTrackingCodeRequired'));
                    return;
                  }
                  //
                  setPending('Edit');
                  updateTrackingNumber(id, trackingCode)
                    .then(() => {
                      setPending('None');
                      updateTab(OrderDetailTabs.Settings);
                    })
                    .catch(() => setPending('None'));
                }}
              />
            </Tooltip>
          </EditButtonContainer>

          {!number && !trackingCode && (
            <EditButtonContainer>
              <Tooltip title={i18n.t('Order.Delivery.CreateShippingLabel')}>
                <Button
                  disabled={isOrderReadOnly}
                  icon={<CarryOutOutlined />}
                  size="small"
                  type="ghost"
                  loading={pending === 'Call'}
                  onClick={() => {
                    setPending('Call');
                    callShipping(id)
                      .then((response) => {
                        setTrackingCode(response?.number);
                        message.success(i18n.t('Order.Edit.CreateShippingLable'));
                        setPending('None');
                      })
                      .catch(() => {
                        setPending('None');
                      });
                  }}
                />
              </Tooltip>
            </EditButtonContainer>
          )}

          <EditButtonContainer>
            <Tooltip title={i18n.t('Order.Delivery.LinkToPacking')}>
              <Button
                icon={<LinkOutlined />}
                size="small"
                type="ghost"
                disabled={isOrderReadOnly}
                loading={pending === 'Link'}
                onClick={() => {
                  setPending('Link');
                  trackingLink(id)
                    .then((link) => {
                      window.open('https://' + link);
                      setPending('None');
                    })
                    .catch(() => setPending('None'));
                }}
              />
            </Tooltip>
          </EditButtonContainer>
          <EditButtonContainer>
            <Tooltip title={i18n.t('Order.Delivery.GeneratePacklistDocument')}>
              <Button
                icon={<FilePdfOutlined />}
                size="small"
                type="ghost"
                loading={pending === 'PackList'}
                onClick={() => {
                  setPending('PackList');

                  generatePackListDocument(id)
                    .then((link) => {
                      setPending('None');
                      window.open(Env.PURE_URL + link);
                    })
                    .catch((error) => {
                      setPending('None');
                      notification.error(error.message);
                    });
                }}
              />
            </Tooltip>
          </EditButtonContainer>
          <EditButtonContainer>
            <Tooltip title={i18n.t('Order.Delivery.RemovePacking')}>
              <Button
                disabled={isOrderReadOnly}
                icon={<CloseCircleOutlined />}
                size="small"
                type="ghost"
                loading={pending === 'Remove'}
                onClick={() => {
                  setPending('Remove');
                  removePacking(id)
                    .then(() => {
                      setPending('None');
                      updateTab(OrderDetailTabs.Settings);
                    })
                    .catch(() => setPending('None'));
                }}
              />
            </Tooltip>
          </EditButtonContainer>
        </Space>
      </Col>
    </Row>
  );
}

export default OrderSettingPackingOptions;
