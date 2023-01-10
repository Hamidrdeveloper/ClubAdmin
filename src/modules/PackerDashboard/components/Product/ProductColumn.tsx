import { ProductVariation } from '@modules/Product/model/ProductVariation.entity';
import { weightFormatter } from '@shared/utils/engine.service';
import { Env } from '@src/core';
import { OrderPacking, OrderSalePositionPure } from '@src/modules/Order';
import { Package } from '@src/modules/Package';
import { Button, Col, Divider, Empty, Image, Row, Space } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { PackerDashboardContext } from '../../context/PackerDashboardContext';
import { BoxActionType } from '../../model/packer';
import PackerProduct from '../PackerProduct';

type ProductsType = ProductVariation & { positionId: number };
type Props = {
  products: ProductsType[];
  packages: OrderPacking[];
  positions: OrderSalePositionPure[];
  onAction: (type: BoxActionType) => void;
  onQuantityChanged: (nQuantity: number, positionId: number) => void;
};
function ProductColumn({ products, onQuantityChanged, onAction, positions, packages }: Props): ReactElement {
  const { selectedBox } = useContext(PackerDashboardContext);
  const { t } = useTranslation();
  function boxToString(box?: Package | null) {
    if (box) {
      return `${box.packingType?.name} - ${box.width} x ${box.height} x ${box.length} - ${weightFormatter(
        box.net_weight,
      )}`;
    }

    return ' - ';
  }

  const getMaxQuantity = (positionId: number) => {
    const positionQuantity =
      (
        positions.find((pos) => pos.id === positionId) ??
        positions
          .filter((p) => p.children.length !== 0)
          .flatMap((p) => p.children)
          .find((p) => p.id === positionId)
      )?.quantity ?? 0;

    const packagedQuantity =
      packages
        .flatMap((p) => p.packingJournalItems)
        .filter((p) => p.order_position_id === positionId)
        .reduce((pre, next) => pre + next.quantity, 0) ?? 0;

    return positionQuantity - packagedQuantity;
  };

  return (
    <Row justify="start" align="top">
      <Col span={24}>
        <h3>
          <b>{t('PackerDashboard.Product')}</b>&nbsp;
          <span>({boxToString(selectedBox)})</span>
        </h3>
        <Image src={'/assets/images/dashboard/open-box.png'} preview={false} />

        <Divider orientation="left">{t('PackerDashboard.ProductsInformation')}</Divider>
      </Col>

      {products.length === 0 && (
        <Col span={24} style={{ paddingBlock: 32 }}>
          <Row justify="center">
            <Empty description={t('PackerDashboard.DoNotProductSelected')} />
          </Row>
        </Col>
      )}

      {products.length > 0 && (
        <Col span={24}>
          {products
            .reverse()
            .map(({ productVariationFiles, quantity, name, has_serial_number, number, positionId }) => (
              <PackerProduct
                key={positionId}
                title={name}
                number={number}
                quantity={quantity}
                positionId={positionId}
                hasSerialNumber={has_serial_number}
                image={productVariationFiles?.length > 0 ? Env.PURE_URL + productVariationFiles[0]?.link : ''}
                onChange={(quantity) => onQuantityChanged(quantity, positionId)}
                maxQuantity={getMaxQuantity(positionId)}
                // positions
                // .find((p) => p.id === positionId)?.quantity}
                // .reduce((prev, next) => prev + next.quantity ?? 0, 0)}
              />
            ))}
          <Divider orientation="left">
            {t('PackerDashboard.TotalWeight')} :&nbsp;
            {weightFormatter(
              products
                .map((pro) => Number(pro.weight_gross) * (pro.quantity ?? 0))
                .reduce((prevWeight, weight) => prevWeight + weight, 0) ?? 0,
            )}
          </Divider>
        </Col>
      )}

      {products.length > 0 && (
        <Col span={24} style={{ padding: '8px 32px' }}>
          <Row justify="center">
            <Space direction="vertical" size="middle">
              <Button block type="primary" size="large" onClick={() => onAction('Close')}>
                {t('PackerDashboard.CloseBox')}
              </Button>
              <Button block type="primary" size="large" onClick={() => onAction('Close With Delivery')}>
                {t('PackerDashboard.CloseBoxShipping')}
              </Button>
              <Button block type="primary" size="large" onClick={() => onAction('Close With Shipping')}>
                {t('PackerDashboard.CloseBoxAndGenerateDelivery')}
              </Button>
            </Space>
          </Row>
        </Col>
      )}
    </Row>
  );
}

export default ProductColumn;
