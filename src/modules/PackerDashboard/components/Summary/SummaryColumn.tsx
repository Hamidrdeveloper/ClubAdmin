import {
  CarryOutOutlined,
  CloseCircleOutlined,
  DownOutlined,
  FilePdfOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import {
  callShipping,
  generateDeliveryNote,
  generatePackListDocument,
} from '@modules/Order/services/order.service';
import { Env } from '@src/core';
import { Button, Col, Collapse, Divider, Empty, Image, Row, Space, Tooltip } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { usePackerDashboardContainerActions } from '../../container/MainContainer/usePackerDashboardContainerActions';
import { PackerDashboardContext } from '../../context/PackerDashboardContext';
import { changeOrderStatusBySlug } from '../../service/order.service';
import PackerProduct from '../PackerProduct';

const { Panel } = Collapse;

type Props = { orderId: number; onDoneCompleted: () => void };
function SummaryColumn({ orderId, onDoneCompleted }: Props): ReactElement {
  const [pending, setPending] = useState<'Delivery' | 'Shipping' | 'Done' | 'PackList' | 'None'>('None');
  const { packedPackages, products, selectedOrder } = useContext(PackerDashboardContext);
  const { onBoxAction } = usePackerDashboardContainerActions();
  const { t } = useTranslation();
  const [PendingId, setPendingId] = useState<number>(-1);

  //
  return (
    <Row justify="start" align="top">
      <Col span={24}>
        <h3>
          <b>{t('PackerDashboard.Summery')}</b>
        </h3>
      </Col>

      <Divider />

      {packedPackages.length === 0 && (
        <Col span={24} style={{ paddingBlock: 32 }}>
          <Row justify="center">
            <Empty description={t('PackerDashboard.EmptyPackage')} />
          </Row>
        </Col>
      )}

      {packedPackages?.map(({ number, packingJournalItems, id }, indx) => {
        return (
          <Col span={24} key={`summery${indx}`}>
            <Collapse ghost expandIconPosition="right">
              <Panel
                header={
                  <Space>
                    <Image
                      width={24}
                      height={24}
                      preview={false}
                      src={'../../../assets/images/dashboard/box.png'}
                    />
                    <span>{number ?? id ?? t('PackerDashboard.NoName')}</span>
                  </Space>
                }
                key="1"
                showArrow={false}
                extra={
                  <Space className="icons" direction="horizontal" align="center">
                    <Tooltip title={t('PackerDashboard.GeneratePacklistDocument')}>
                      <FilePdfOutlined
                        spin={pending === 'PackList' && PendingId === indx}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPending('PackList');
                          setPendingId(indx);
                          generatePackListDocument(id)
                            .then((link) => {
                              setPendingId(-1);
                              setPending('None');
                              window.open(Env.PURE_URL + link);
                            })
                            .catch(() => {
                              setPendingId(-1);
                              setPending('None');
                            });
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={t('PackerDashboard.GenerateDeliveryNote')}>
                      <LinkOutlined
                        spin={pending === 'Delivery' && PendingId === indx}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPending('Delivery');
                          setPendingId(indx);
                          generateDeliveryNote(orderId, { invoice_type: 'delivery_note' })
                            .then((link) => {
                              setPendingId(-1);
                              setPending('None');
                              window.open(Env.PURE_URL + link);
                            })
                            .catch(() => {
                              setPendingId(-1);
                              setPending('None');
                            });
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={t('PackerDashboard.CreateShippingLabel')}>
                      <CarryOutOutlined
                        spin={pending === 'Shipping' && PendingId === indx}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPendingId(indx);
                          setPending('Shipping');
                          callShipping(id)
                            .then((data) => {
                              setPendingId(-1);
                              setPending('None');
                              window.open(Env.PURE_URL + data['labels']['link'], '_blank');
                            })
                            .catch(() => {
                              setPendingId(-1);
                              setPending('None');
                            });
                        }}
                      />
                    </Tooltip>
                    <Tooltip title={t('PackerDashboard.RemovePacking')}>
                      <CloseCircleOutlined
                        onClick={(event) => {
                          event.stopPropagation();
                          onBoxAction('Remove', id);
                        }}
                      />
                    </Tooltip>
                    <DownOutlined id="arrow" />
                  </Space>
                }
              >
                <div style={{ padding: 8 }}>
                  {packingJournalItems.map((products) => (
                    <PackerProduct
                      positionId={0}
                      key={products.id}
                      quantity={products.quantity}
                      number={products.productVariation.number}
                      title={products.productVariation.name ?? t('PackerDashboard.NoName')}
                      image={Env.PURE_URL + products.productVariation.product.file}
                    />
                  ))}
                </div>
              </Panel>
              <hr />
            </Collapse>
          </Col>
        );
      })}

      {selectedOrder &&
        products
          .filter((p) => p.order_position_type_id !== 2 && p.order_position_type_id !==16 && p.productVariation)
          .reduce((prev, next) => prev + next.quantity, 0) +
          products.flatMap((p) => p.children).reduce((prev, next) => prev + next.quantity, 0) ===
          packedPackages.reduce(
            (prev, next) => prev + next.packingJournalItems.reduce((n, v) => n + v.quantity, 0),
            0,
          ) && (
          <Col span={24}>
            <Row style={{ padding: 32 }}>
              <Button
                block
                id="done"
                size="large"
                type="primary"
                loading={pending === 'Done'}
                onClick={() => {
                  setPending('Done');
                  changeOrderStatusBySlug({ orderId, slug: 'ready-to-ship' })
                    .then(() => {
                      setPending('None');
                      onDoneCompleted();
                    })
                    .catch(() => setPending('None'));
                }}
              >
                {t('PackerDashboard.DonePacking')}
              </Button>
            </Row>
          </Col>
        )}
    </Row>
  );
}

export default SummaryColumn;
