import { OrderSalePositionPure, OrderSalePure } from '@modules/Order';
import {
  M_quantityLessThanZeroStates,
  NormalizedSelectedProducts,
} from '@modules/PackerDashboard/model/packer';

export function removeProductFromListWithQuantity(
  selectedProducts: OrderSalePositionPure[],
  positionId: number,
): OrderSalePositionPure[] {
  // const index = selectedProducts.findIndex((pros) => pros.id === positionId);
  // selectedProducts.splice(index);
  selectedProducts = selectedProducts.filter(pos=>pos.id != positionId)
  return [...selectedProducts];
}

export function changeProductQuantityWithProductId(
  selectedProducts: OrderSalePositionPure[],
  positionId: number,
  nQuantity: number,
): OrderSalePositionPure[] {
  const item = selectedProducts.findIndex((pros) => pros.id === positionId);
  if (selectedProducts[item]) selectedProducts[item].quantity = nQuantity;
  return [...selectedProducts];
}

export function quantityLessThanZero(
  positionId: number,
  nQuantity: number,
  states: M_quantityLessThanZeroStates,
): void {
  const selectedProduct = states.selectedOrder?.orderSalePositions.find(
    (orderPos) => orderPos.id === positionId,
  );

  const isQuantityLessThanSelectedProductQuantity = nQuantity <= (selectedProduct?.quantity ?? 1);

  if (isQuantityLessThanSelectedProductQuantity) {
    states.setSelectedProducts((productList) =>
      removeProductFromListWithQuantity(productList, positionId),
    );
  }
}

export function setNewPositionQuantitiesFromSelectedOrder(
  selectedOrder: OrderSalePure | null,
  selectedProducts: OrderSalePositionPure[],
): OrderSalePure | null {
  if (selectedOrder) {
    selectedOrder.orderSalePositions = selectedOrder.orderSalePositions.map((position) =>
      reduceProductQuantitiesFromSubmittedProducts(position, selectedProducts),
    );
    return { ...selectedOrder };
  }

  return null;
}

function reduceProductQuantitiesFromSubmittedProducts(
  position: OrderSalePositionPure,
  selectedProducts: OrderSalePositionPure[],
): OrderSalePositionPure {
  const found = selectedProducts.find((product) => product.id === position.id); 
  if (found) position.quantity -= found.quantity;

  return { ...position };
}

export function normalizeSelectedProducts({
  quantity,
  productVariation,
  id,
  order_position_type_id,
  parent_id
}: OrderSalePositionPure): NormalizedSelectedProducts {
  return {
    quantity: quantity,
    product_variation_id: productVariation.id,
    order_position_id : id,
    isActive: true,
    name: productVariation?.name,
    order_position_type_id: order_position_type_id,
    parent_id: parent_id,
  };
}
