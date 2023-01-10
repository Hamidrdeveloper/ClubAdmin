import { PackerDashboardContext } from '@modules/PackerDashboard/context/PackerDashboardContext';
import { OrderPacking, OrderSalePositionPure } from '@src/modules/Order';
import { message } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { getOrdersFilterByPackerSlug } from '../service/order.service';

let controller: AbortController;

type HookProps = {
  whenBarcodeTypeIsBox: () => void;
  whenBarcodeTypeIsOrder: () => void;
  addProductExistance: (barcode: string) => void;
  whenBarcodeTypeIsProduct: (variationId?: number, positionId?: number) => void;
};

export function useBarcodeChangePacker(): HookProps {
  const {
    barcode: typedBarcode,
    setSpinning,
    setSelectedOrder,
    setProducts,
    setBarcode,
    setBarcodeType,
    packages,
    setSelectedBox,
    products,
    setSelectedProducts,
    setPackedPackages,
    selectedProducts,
    serialNumberVisible,
    setSerialNumberVisible,
    packedPackages,
  } = useContext(PackerDashboardContext);
  const { t } = useTranslation();

  async function whenBarcodeTypeIsOrder() {
    if (controller) {
      controller.abort();
    }

    const isBarcodeLengthValid = typedBarcode.length >= 5;

    if (isBarcodeLengthValid) {
      setSpinning('Order');
      controller = new AbortController();
      const foundedOrder = await getOrdersFilterByPackerSlug(typedBarcode, controller.signal);
      setSpinning('None');

      if (foundedOrder.length > 0) {
        // const productsFromFoundedOrder = foundedOrder[0].orderSalePositions?.filter(
        //   (pos) => pos.product_variation_id && pos.order_position_type_id !== 2,
        // );
        const productsFromFoundedOrder = foundedOrder[0].orderSalePositions;

        setSelectedOrder(foundedOrder[0]);
        setProducts(productsFromFoundedOrder);
        setBarcode('');
        setBarcodeType('Box');

        setSpinning('All');
        axios
          .get<OrderPacking[]>(`/order-sales/${foundedOrder[0].id}/packing`, { signal: controller.signal })
          .then(({ data: packs }) => {
            setPackedPackages(packs?.['data'] as unknown as OrderPacking[]);
            setSpinning('None');
          });

        message.success(t('PackerDashboard.OrderSelected'));
      } else {
        message.error(t('PackerDashboard.OrderIsNotInPackingStatus'));
      }
    }
  }

  function whenBarcodeTypeIsBox() {
    const foundedPackage = packages?.find(({ id }) => String(id) === typedBarcode);

    if (foundedPackage) {
      setSelectedBox(foundedPackage);
      setBarcode('');
      setBarcodeType('Product');

      message.success(t('PackerDashboard.BoxSelected'));
    }
  }
  const calcQuantity = (positionId: number) => {
    return (
      (selectedProducts.find((sp) => sp.id === positionId)?.quantity ?? 0) +
      packedPackages
        ?.flatMap((p) => p.packingJournalItems)
        .filter((pkg) => pkg.order_position_id == positionId)
        .reduce((pre, next) => pre + next.quantity, 0)
    );
  };
  const getProductList = () => {
    const productList: OrderSalePositionPure[] = [];
    products
      .filter((p) => p.children.length === 0 && p.quantity > calcQuantity(p.id))
      .map((pro) => productList.push(pro));
    products
      .filter((p) => p.children.length !== 0)
      .flatMap((p) => p.children)
      .filter((p) => p.quantity > calcQuantity(p.id))
      .map((pro) => productList.push(pro));
    return productList;
  };

  async function whenBarcodeTypeIsProduct(variationId?: number, positionId?: number) {
    const isBarcodeLengthValid = typedBarcode.length >= 5;

    if (variationId && positionId) {
      const foundedProduct =
        products.find((pos) => pos.id === positionId) ??
        products
          .filter((p) => p.children.length !== 0)
          .flatMap((p) => p.children)
          .find((p) => p.id === positionId);

      const foundedBeforeProduct = selectedProducts.find(
        (pos) => pos.id === positionId, //&& sib.productVariation?.id === variationId,
      );

      if (foundedProduct && !foundedBeforeProduct) {
        setSelectedProducts((prev) => [...prev, { ...foundedProduct, quantity: 1 }]);
      } else if (foundedProduct && foundedBeforeProduct) {
        setSelectedProducts((prev) =>
          prev.map((product) =>
            product.id === foundedBeforeProduct.id
              ? { ...foundedBeforeProduct, quantity: foundedBeforeProduct.quantity + 1 }
              : product,
          ),
        );
      }
      setBarcodeType('Product');
      message.success(t('PackerDashboard.ProductSelected'));
    } else if (isBarcodeLengthValid) {
      const productList = getProductList();
      const foundedProduct = productList.find(
        ({ productVariation: { barcodes } }) => !!barcodes.find(({ value }) => value === typedBarcode),
      );

      if (foundedProduct === undefined) {
        return message.error(t('PackerDashboard.OnlyProductBarcode'));
      }

      const foundedBeforeProduct = selectedProducts.find(
        ({ productVariation: { barcodes } }) => !!barcodes.find(({ value }) => value === typedBarcode),
      );

      if (
        foundedProduct &&
        !serialNumberVisible.visible &&
        (foundedProduct?.productVariation.has_serial_number ||
          foundedBeforeProduct?.productVariation.has_serial_number)
      ) {
        setSerialNumberVisible({ visible: true, barcode: typedBarcode, positionId: foundedProduct.id });
        return;
      }

      addProductExistance(typedBarcode);
    }
  }

  function addProductExistance(barcode: string) {
    const productList = getProductList();

    const foundedProduct = productList.find(
      ({ productVariation: { barcodes } }) => !!barcodes.find(({ value }) => value === barcode),
    );

    const foundedBeforeProduct = selectedProducts.find(
      (p) => p.id === foundedProduct?.id && p.productVariation.barcodes.some((m) => m.value === barcode),
    );

    if (foundedProduct && !foundedBeforeProduct) {
      setSelectedProducts((prev) => [...prev, { ...foundedProduct, quantity: 1 }]);
      setBarcode('');
      setBarcodeType('Product');

      message.success(t('PackerDashboard.ProductSelected'));
    } else if (foundedProduct && foundedBeforeProduct) {
      if (foundedBeforeProduct.quantity < foundedProduct.quantity) {
        setSelectedProducts((prev) =>
          prev.map((product) =>
            // product.product_variation_id === foundedBeforeProduct.product_variation_id
            product.id === foundedBeforeProduct.id
              ? { ...foundedBeforeProduct, quantity: foundedBeforeProduct.quantity + 1 }
              : product,
          ),
        );
        setBarcode('');
        setBarcodeType('Product');
        message.success(t('PackerDashboard.ProductSelected'));
      }
    }
  }

  return { whenBarcodeTypeIsOrder, whenBarcodeTypeIsBox, whenBarcodeTypeIsProduct, addProductExistance };
}
