import i18n from '@src/core/i18n/config';
import productModuleInfo from '@src/modules/Product/ModuleInfo.json';
import { Tag, Tooltip } from 'antd';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Inventory } from '../model/inventory';

export const BooleanTagRenderer: FC<boolean> = (data) =>
  data ? <Tag color="green">{i18n.t('Global.Yes')}</Tag> : <Tag color="red">{i18n.t('Global.No')}</Tag>;

export const NavigateToVariationRenderer: FC<number> = (variationId, rowData: Inventory) => {
  // link to user page
  const productId = rowData.productVariation?.product?.id;
  return (
    <>
      {productId && variationId ? (
        <Link to={`../..${productModuleInfo.Route.replace('*', '')}manage/${productId}/${variationId}`}>
          {variationId}
        </Link>
      ) : (
        <span>{variationId}</span>
      )}
    </>
  );
};

export const PackedQuantityRenderer: FC<string> = (packedQuantity, allData: Inventory) => {
  const tooltipTitle = allData.info['packed_quantity'];

  return <Tooltip title={tooltipTitle}>{packedQuantity}</Tooltip>;
};

export const PurchaseQuantityRenderer: FC<string> = (purchasedQuantity, allData: Inventory) => {
  const tooltipTitle = allData.info['picked_quantity'];

  return <Tooltip title={tooltipTitle}>{purchasedQuantity}</Tooltip>;
};
