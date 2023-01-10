import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { addressAtom, productAtom } from '@modules/OrderDashboard/Atom';
import { intlCurrency } from '@shared/utils/engine.service';
import { Card, Divider, Input, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useAtom } from 'jotai';
import { sumBy } from 'lodash';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ProductTable: FC = () => {
  const { Text } = Typography;
  const { t } = useTranslation();
  const [address] = useAtom(addressAtom);
  const [products, setProducts] = useAtom(productAtom);
  const selectedProductColumns: ColumnsType<any> = [
    {
      title: t('OrderDashboard.ProductVariationId'),
      dataIndex: 'id',
      width: '15%',
    },
    {
      title: t('OrderDashboard.ProductVariationNumber'),
      dataIndex: 'number',
      width: '15%',
    },
    {
      title: t('OrderDashboard.Name'),
      dataIndex: 'name',
      width: '20%',
    },
    {
      title: t('OrderDashboard.Quantity'),
      dataIndex: 'quantity',
      width: '10%',
      render: (val, row) => {
        const [value, setValue] = useState(1);

        function onChange(e) {
          setValue(parseInt(e.target.value));

          const shallowProducts = [...products];
          shallowProducts.find((T) => T.id === row.id)!['count'] = parseInt(e.target.value);
          setProducts(shallowProducts);
        }

        function onDecrease() {
          value > 0 && setValue(value - 1);

          const shallowProducts = [...products];
          shallowProducts.find((T) => T.id === row.id)!['count'] = value - 1;
          setProducts(shallowProducts);
        }

        function onIncrease() {
          setValue(value + 1);
          const shallowProducts = [...products];
          shallowProducts.find((T) => T.id === row.id)!['count'] = value + 1;
          setProducts(shallowProducts);
        }

        return (
          <>
            {val !== undefined && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MinusOutlined onClick={onDecrease} />
                <div style={{ textAlign: 'center' }}>
                  <Input
                    onChange={(e) => {
                      onChange(e || '');
                    }}
                    value={value}
                    style={{ width: '70px', margin: '0 10px' }}
                  />
                </div>

                <PlusOutlined onClick={onIncrease} />
              </div>
            )}
            {value > val && (
              <Text type="danger" style={{ padding: ' 5px 25px' }}>
                out of limit !
              </Text>
            )}
          </>
        );
      },
    },
    {
      title: t('OrderDashboard.PriceNet'),
      dataIndex: ['sale_price', 'value_after_discount'],
      width: '10%',
      render: (value) => intlCurrency(address?.currency?.iso3 ?? 'EUR', value ?? 0),
    },
    {
      title: 'VAT%',
      dataIndex: ['sale_price', 'vat_percent'],
      width: '10%',
    },
    {
      title: t('OrderDashboard.PriceGross'),
      dataIndex: ['sale_price', 'gross_value_after_discount'],
      width: '10%',
      render: (value) => intlCurrency(address?.currency?.iso3 ?? 'EUR', value ?? 0),
    },
    {
      title: t('OrderDashboard.ProvisionPrice'),
      dataIndex: 'productVariationMlmDetails',
      width: '10%',
      render: (value) =>
        value && intlCurrency(address?.currency?.iso3 ?? 'EUR', value[0]?.provision_price ?? 0),
    },
    {
      title: 'POP',
      dataIndex: 'productVariationMlmDetails',
      width: '10%',
      render: (value) => <p>{value && value[0]?.percentage_of_provision}</p>,
    },
  ];

  const selectedProductDataSource = useMemo(() => {
    const totalPrices = products.map((P) => {
      return {
        net: (P.product.sale_price?.value_after_discount || 0) * P.count,
        gross: (P.product?.sale_price?.gross_value_after_discount || 0) * P.count,
        pop: (P.product?.productVariationMlmDetails![0]?.provision_price || 0) * P.count,
      };
    });

    return [
      ...products.map((T) => T.product),
      {
        id: 'Total',
        sale_price: {
          value_after_discount: sumBy(totalPrices, 'net'),
          gross_value_after_discount: sumBy(totalPrices, 'gross'),
        },
        productVariationMlmDetails: [{ provision_price: sumBy(totalPrices, 'pop') }],
      },
    ];
  }, [products]);
  return (
    <>
      <Divider orientation="left">{t('OrderDashboard.SelectedProducts')}</Divider>
      <Card>
        <Table
          rowKey="id"
          className="selectedProductsTable"
          columns={selectedProductColumns}
          dataSource={selectedProductDataSource}
        />
      </Card>
    </>
  );
};

export default ProductTable;
