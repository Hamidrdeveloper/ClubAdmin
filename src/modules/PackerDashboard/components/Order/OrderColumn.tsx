import { OrderPacking, OrderSalePositionPure } from '@modules/Order';
import { Env } from '@src/core';
import { Col, Collapse, Divider, Empty, Row, Spin } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import PackerProduct from '../PackerProduct';

const { Panel } = Collapse;
type Props = {
  orderId: number;
  isPending: boolean;
  packages: OrderPacking[];
  positions: OrderSalePositionPure[];
  selectedPositions: OrderSalePositionPure[];
};
function OrderColumn({ positions, orderId, selectedPositions, packages, isPending }: Props): ReactElement {
  const { t } = useTranslation();
  return (
    <MainContainer align="top" justify="start">
      <Col span={24}>
        <h3>
          <b>
            {t('PackerDashboard.Order')} {orderId === -1 ? '' : `(${t('Global.ID')}: ${orderId})`}
          </b>
        </h3>
      </Col>

      {positions.length > 0 && <Divider orientation="left">{t('PackerDashboard.OrderPositions')}</Divider>}

      {positions.length === 0 ? (
        <Col span={24} style={{ paddingBlock: 32 }}>
          <Row justify="center">
            <Spin spinning={isPending}>
              <Empty description={t('PackerDashboard.DoNotOrderSelected')} />
            </Spin>
          </Row>
        </Col>
      ) : (
        <Col span={24}>
          <Collapse ghost>
            {positions
              .filter((pos) => pos.order_position_type_id === 2)

              .map(({ id, productVariation, children }) => (
                <React.Fragment key={id}>
                  {selectedPositions
                    .filter((p) => p.parent_id === id)
                    .reduce((pre, nex) => pre + nex.quantity ?? 0, 0) +
                    packages
                      .flatMap((p) => p.packingJournalItems)
                      .filter(
                        (p) => p.order_position_id === children.find((m) => m.id === p.order_position_id)?.id,
                      )
                      .reduce((pre, nex) => pre + nex.quantity ?? 0, 0) !==
                    children.reduce((pre, nex) => pre + nex.quantity ?? 0, 0) && (
                    <Panel
                      key={id}
                      header={
                        <PackerProduct
                          isParent
                          positionId={id}
                          number={productVariation.number}
                          variationId={productVariation.id}
                          title={productVariation.name ?? t('PackerDashboard.NoData')}
                          image={
                            productVariation.productVariationFiles.length > 0
                              ? Env.PURE_URL + productVariation.productVariationFiles[0].link
                              : ''
                          }
                        />
                      }
                    >
                      {children?.map((pos) => (
                        <PackerProduct
                          positionId={pos.id}
                          key={`child-${pos.id}`}
                          number={pos.productVariation.number}
                          variationId={pos.product_variation_id}
                          title={pos.productVariation?.name ?? t('PackerDashboard.NoName')}
                          hasSerialNumber={pos.productVariation?.has_serial_number}
                          image={
                            pos.productVariation.productVariationFiles?.length > 0
                              ? Env.PURE_URL + pos.productVariation.productVariationFiles[0]?.link
                              : ''
                          }
                          quantity={
                            (pos?.quantity ?? 0) -
                            (selectedPositions.find((sp) => sp.id === pos.id)?.quantity ?? 0) -
                            packages
                              .flatMap((p) => p.packingJournalItems)
                              .filter((pkg) => pkg.order_position_id == pos.id)
                              .reduce((pre, next) => pre + next.quantity, 0)
                          }
                        />
                      ))}
                    </Panel>
                  )}
                  <hr />
                </React.Fragment>
              ))}

            {positions
              .filter(
                (pos) =>
                  pos.parent_id === null &&
                  pos.productVariation &&
                  pos.order_position_type_id !== 2 &&
                  pos.order_position_type_id !== 3,
              )

              .map((pos) => (
                <PackerProduct
                  positionId={pos.id}
                  key={`product-${pos.id}`}
                  number={pos.productVariation.number}
                  variationId={pos.product_variation_id}
                  hasSerialNumber={pos.productVariation?.has_serial_number}
                  image={
                    pos.productVariation.productVariationFiles.length > 0
                      ? Env.PURE_URL + pos.productVariation.productVariationFiles[0].link
                      : ''
                  }
                  quantity={
                    (pos?.quantity ?? 0) -
                    (selectedPositions.find((sp) => sp.id === pos.id)?.quantity ?? 0) -
                    packages
                      .flatMap((p) => p.packingJournalItems)
                      .filter((pkg) => pkg.order_position_id == pos.id)
                      .reduce((pre, next) => pre + next.quantity, 0)
                  }
                  title={pos.productVariation?.name ?? t('PackerDashboard.NoName')}
                />
              ))}
          </Collapse>
        </Col>
      )}
    </MainContainer>
  );
}

export default OrderColumn;

const MainContainer = styled(Row)`
  & .ant-collapse-header {
    align-items: center !important;
  }
`;
