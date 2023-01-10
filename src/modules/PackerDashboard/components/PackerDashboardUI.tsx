import OrderColumn from '@modules/PackerDashboard/components/Order/OrderColumn';
import ProductColumn from '@modules/PackerDashboard/components/Product/ProductColumn';
import SummaryColumn from '@modules/PackerDashboard/components/Summary/SummaryColumn';
import { PackerDashboardContext } from '@modules/PackerDashboard/context/PackerDashboardContext';
import { BoxActionType } from '@modules/PackerDashboard/model/packer';
import { Col, Row } from 'antd';
import React, { ReactElement, useContext } from 'react';

type Props = {
  onBoxAction: (action: BoxActionType) => void;
  onQuantityChanged: (nQuantity: number, positionId: number) => void;
  onDoneCompleted: () => void;
};
function PackerDashboardUI({ onBoxAction, onQuantityChanged, onDoneCompleted }: Props): ReactElement {
  const { selectedOrder, selectedProducts, packedPackages, spinning } = useContext(PackerDashboardContext);

  return (
    <Row className="content" gutter={16}>
      <Col span={7} className="packer-col">
        <OrderColumn
          packages={packedPackages}
          isPending={spinning === 'Order'}
          orderId={selectedOrder?.id ?? -1}
          selectedPositions={selectedProducts}
          positions={selectedOrder?.orderSalePositions ?? []}
        />
      </Col>

      <Col span={10} className="packer-col">
        <ProductColumn
          packages={packedPackages}
          onAction={onBoxAction}
          positions={selectedOrder?.orderSalePositions ?? []}
          products={
            selectedProducts?.map(({ productVariation, quantity, weight_gross, id }) => ({
              ...productVariation,
              quantity,
              weight_gross,
              positionId: id,
            })) ?? []
          }
          onQuantityChanged={onQuantityChanged}
        />
      </Col>

      <Col span={7} className="packer-col">
        <SummaryColumn orderId={selectedOrder?.id ?? -1} onDoneCompleted={onDoneCompleted} />
      </Col>
    </Row>
  );
}

export default PackerDashboardUI;
