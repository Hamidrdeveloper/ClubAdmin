import { productAtom, userAtom } from '@modules/OrderDashboard/Atom';
import { getShopVariations } from '@modules/OrderDashboard/services/productVariations.service';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

const SearchProduct: FC = () => {
  const [user] = useAtom(userAtom);
  const [productsAtom, setProductsAtom] = useAtom(productAtom);
  const { t } = useTranslation();
  const [productItem, setProductItem] = useState<any>();
  const { Title, Text } = Typography;
  productItem && console.log(JSON.parse(productItem), 'JSON.parse(productItem)');
  const exist = productsAtom?.length && productsAtom?.some((P) => P.id === JSON.parse(productItem).id);

  useMemo(() => {
    productItem &&
      !exist &&
      setProductsAtom([
        ...productsAtom,
        { id: JSON.parse(productItem).id, product: JSON.parse(productItem), count: 1 },
      ]);
  }, [productItem]);
  const [searchText, setSearchText] = useState('');
  const { data: products, isLoading } = useQuery(['dashboard-products', searchText], () =>
    getShopVariations(user?.id, searchText),
  );

  const productOptions = useMemo(() => {
    return products?.data?.map((P) => {
      return {
        value: JSON.stringify(P),
        label: P?.name,
      };
    });
  }, [products]);

  return (
    <Row>
      <Col span={5}>
        <Title level={5}>{t('OrderDashboard.Product')}:</Title>
      </Col>
      <Col span={14}>
        <Select
          showSearch
          onSearch={(value) => setSearchText(value)}
          placeholder="Choose Product"
          notFoundContent={isLoading ? <Spin size="small" /> : <Text type="warning">no item !</Text>}
          style={{ width: '100%' }}
          options={productOptions}
          onSelect={(e) => {
            setProductItem(e);
          }}
        />
      </Col>
    </Row>
  );
};
export default SearchProduct;
