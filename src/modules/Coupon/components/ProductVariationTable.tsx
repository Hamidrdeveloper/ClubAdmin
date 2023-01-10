import i18n from '@src/core/i18n/config';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import VariationModule from '@src/modules/Product/Variation.module';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch, Key, ReactElement } from 'react';

export default function ProductTable(
  setSelectedProducts: Dispatch<SetStateAction<ProductVariation[]>>,
): ReactElement {
  const variationModule = new VariationModule();

  const GetSelectedRows = (selectedRows: Key[], selectedRowsData: Key[][]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          console.log({ selectedRowsData, selectedRows });
          setSelectedProducts((prev) => {
            const allSelectedProducts = [...prev, ...(selectedRowsData as unknown as ProductVariation[])];

            const uniqueProducts = allSelectedProducts.filter(
              (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
            );

            return uniqueProducts;
          });
        }}
        disabled={selectedRows.length === 0}
      >
        {i18n.t('Coupon.AddSelected')}
      </Button>
    );
  };

  return (
    <PageLayout<ProductVariation> module={variationModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} dontNavigate ExtraAction={GetSelectedRows} />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          module={variationModule}
          tableScroll={{ y: 640, x: 1300 }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
