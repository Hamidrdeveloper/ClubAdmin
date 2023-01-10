import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { Supplier } from '@src/modules/Supplier';
import { Col, Row, Select, Space } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { OrderPositionAddFilterForm } from '../../components/OrderPositions/OrderPositionAddFilterForm';
import OrderSingleAddPosition from '../../components/OrderPositions/OrderSingleAddPosition';
import { getProductVariationsForAdd } from '../../controllers/productVariations.controller';
import { OrderModuleType } from '../..';

type Props = {
  orderSaleId: number;
  supplier: Supplier | undefined;
  moduleType: OrderModuleType;
  addOrderSalePosition: (
    product_variation_id: number,
    quantity: number,
    order_sale_id: number,
    onComplete: () => void,
  ) => void;
};
export const OrderSalePositionAdd = ({
  orderSaleId,
  moduleType,
  supplier,
  addOrderSalePosition,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const [pending, setPending] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [productVariations, setProductVariations] = useState<ProductVariation[]>([]);

  const onFormSubmit = ({ quantity, product_id, number, item_data, category, is_active, flag }) => {
    setPending(true);
    const data = {
      quantity,
      productId: product_id,
      number,
      fulltext: item_data,
      categoryId: category?.id,
      isActive: is_active,
      flags: flag?.id,
      supplierId: moduleType === 'purchase' ? supplier?.id : undefined,
    };
    for (const k in data) if (!data[k]) delete data[k];
    //
    getProductVariationsForAdd(data)
      .then((products) => {
        setProductVariations(products);
        setPending(false);
      })
      .catch(() => setPending(false));
  };

  return (
    <AddPositionContainer>
      <Row className="positions-header">
        <Col span={8}>
          <span>{t('Global.SortBy')}: </span>
          <Select defaultValue={'name'} disabled className="sort-select">
            <Select.Option value={'name'}>{t('Global.NameASC')}</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row className="positions-first">
        <Col span={24}>
          <OrderPositionAddFilterForm
            moduleType={moduleType}
            supplierFullName={
              moduleType === 'purchase'
                ? (supplier?.people?.first_name ?? '') + ' ' + (supplier?.people?.last_name ?? '')
                : ''
            }
            pending={pending}
            quantity={quantity}
            setQuantity={setQuantity}
            onFormSubmit={onFormSubmit}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PositionsContainer>
            <MainContainer>
              <ListContainer>
                <Row className="header">
                  <Col span={2} className="title">
                    <Row align="middle">
                      <span>{t('Global.ID')}</span>
                    </Row>
                  </Col>

                  <Col span={5} className="title">
                    <Row align="middle">
                      <span>{t('Global.Name')}</span>
                    </Row>
                  </Col>

                  <Col span={3} className="title">
                    <Row align="middle">
                      <span>{t('Global.Number')}</span>
                    </Row>
                  </Col>

                  <Col span={2} className="title">
                    <Row align="middle">
                      <span>{t('Order.Position.Barcode')}</span>
                    </Row>
                  </Col>

                  <Col span={4} className="title">
                    <Row align="middle">
                      <span>{t('Order.Position.PurchasePrice')}</span>
                    </Row>
                  </Col>

                  <Col span={4} className="title">
                    <Row align="middle">
                      <span>{t('Order.Position.InvoiceAmount')}</span>
                    </Row>
                  </Col>

                  <Col span={2} className="title">
                    <Row align="middle">
                      <span>{t('Global.IsActive')}</span>
                    </Row>
                  </Col>

                  <Col span={2} className="title">
                    <Row align="middle">
                      <span>{t('Global.Action')}</span>
                    </Row>
                  </Col>
                </Row>

                <Space direction="vertical" className="positions">
                  {productVariations.map((productVariation) => (
                    <OrderSingleAddPosition
                      key={productVariation.id}
                      vars={productVariation}
                      add={(product_variation_id, onComplete) => {
                        setPending(true);
                        addOrderSalePosition(product_variation_id, quantity, orderSaleId, () => {
                          setPending(false);
                          onComplete();
                        });
                      }}
                    />
                  ))}
                </Space>
              </ListContainer>
            </MainContainer>
          </PositionsContainer>
        </Col>
      </Row>
    </AddPositionContainer>
  );
};

const MainContainer = styled.div`
  & .tabs {
    padding-bottom: 16px;

    & button {
      min-width: 200px;
    }
  }

  & .positions {
    width: 100%;
    padding-block: 8px;

    & .ant-space-item {
      &:nth-child(odd) {
        background: #fbfbfb;
      }

      &:nth-child(even) {
        background: #f2f2f2;
      }
    }
  }
`;

const ListContainer = styled.div<{ isHeader?: boolean }>`
  border-radius: 12px;
  background: #fff;

  & .header {
    border-radius: ${(props) => (props.isHeader ? '12px 12px 0 0' : '0')};
    background: #4a5161;
    color: #fff;
    padding: 16px;
    height: 80px;
    font-size: 0.874rem;
    font-weight: 500;

    & .title {
      height: 100%;

      & .ant-row {
        height: 100%;
        padding-inline: 6px;
      }
    }
  }
`;
const PositionsContainer = styled.div`
  padding: 16px 0;
`;

const AddPositionContainer = styled.div`
  background: white;

  & .positions-header {
    border-radius: 12px 12px 0 0;
    background: #4a5161;
    color: #fff;
    padding: 16px;
    height: 80px;
    font-size: 0.874rem;
    font-weight: 500;
    align-items: center;

    .sort-select {
      margin-left: 4px;
      min-width: 16vw;
    }
  }

  & .positions-first {
    padding: 32px 16px;
  }
`;
