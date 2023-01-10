import { Loader, PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import ProductUpsert from '../containers/ProductUpsert';
import { Product } from '../model/Product.entity';
import ProductModule from '../Product.module';
import VariationList from '../VariationList/pages/VariationList.page';
import Styles from './styles/ProductMange.style';
import VariationManage from './VariationManage.page';

const { TabPane } = Tabs;

interface TabContext {
  key: string;
  title: string;
  variationId?: number | null;
}

const ProductsManage = (): ReactElement => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { product_id: paramProductId, variation_id: paramVariationId } = useParams();
  const productModule = useMemo(() => new ProductModule(), []);
  const routes = [
    ...productModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: paramProductId
        ? `${productModule.title[0]} - ${paramProductId}`
        : `New ${productModule.title[0]}`,
    },
  ];

  const [tabs, setTabs] = useState<TabContext[]>([]);
  const [activeKey, setActiveKey] = useState<string>('-1');
  const [isPending, setPending] = useState<boolean>(false);
  const [singleProduct, setSingleProduct] = useState<Product>();

  useEffect(() => {
    if (!paramProductId) return;

    setPending(true);
    productModule.apiService.getOne(Number(paramProductId)).then((data: Product) => {
      setSingleProduct(data);
      setPending(false);
      const variationId = paramVariationId ? Number(paramVariationId) : data.main_variation_id;

      if (variationId) {
        setActiveKey(String(variationId));

        setTabs((prev) => [
          ...prev.filter((tab) => tab.key !== '0'),
          {
            key: String(variationId),
            title: String(variationId),
            variationId: variationId,
          },
        ]);
      } else {
        // Show Variation List
        setActiveKey(String(-2));
      }
    });
  }, [paramProductId]);

  const onTabChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  const handleCreate = (id: number) => {
    setTabs((prev) => [
      ...prev.filter((tab) => tab.key !== '0'),
      {
        key: String(id),
        title: String(id),
        variationId: id,
      },
    ]);
    setActiveKey(String(id));
  };

  const onNewVariation = () => {
    if (!tabs.some((tab) => tab.key === '0')) {
      setActiveKey('0');
      setTabs((prev) => [
        ...prev,
        {
          key: '0',
          variationId: null,
          title: 'New Variation',
        },
      ]);
    } else setActiveKey('0');
  };

  const onUpdateVariation = (id: number) => {
    if (!tabs.some((tab) => tab.key === String(id))) {
      setActiveKey(String(id));
      setTabs((prev) => [
        ...prev,
        {
          key: String(id),
          title: String(id),
          variationId: id,
        },
      ]);
    } else setActiveKey(String(id));
  };

  const handleEditTab = (targetKey: string, action: string) => {
    if (action === 'remove') {
      setActiveKey('2');
      setTabs((prev) => prev.filter((tab) => tab.key !== targetKey));
    }
  };

  const handleUpsertCallback = (data: Product) => {
    if (!paramProductId) {
      navigate(`/admin/products/manage/${data.id}`);
    } else {
      setSingleProduct(data);
    }
  };

  return (
    <PageLayout<Product> module={productModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel noOverflow>
        <Styles.TabsContainer>
          <Tabs
            hideAdd
            type="editable-card"
            onEdit={handleEditTab}
            onChange={onTabChange}
            className="product-tabs"
            defaultActiveKey={activeKey}
          >
            <TabPane className="single-tab" closable={false} tab={t('Product.Tab.Product')} key="-1">
              {isPending ? (
                <Loader title={t('Product.Loader')} />
              ) : (
                <ProductUpsert singleData={singleProduct} onCallback={handleUpsertCallback} />
              )}
            </TabPane>

            <TabPane
              key="-2"
              tab={t('Product.Tab.Variations')}
              closable={false}
              className="single-tab"
              disabled={!paramProductId}
            >
              {paramProductId && (
                <VariationList
                  onNew={onNewVariation}
                  onUpdate={onUpdateVariation}
                  productId={+paramProductId}
                />
              )}
            </TabPane>

            {tabs.length > 0 &&
              singleProduct &&
              tabs.map((tab) => (
                <TabPane className="single-tab" closable tab={tab.title} key={tab.key}>
                  <VariationManage
                    product={singleProduct}
                    onCreate={handleCreate}
                    variationId={tab.variationId}
                    productId={Number(paramProductId)}
                  />
                </TabPane>
              ))}

            <TabPane
              className="single-tab"
              closable={false}
              tab={t('Product.Tab.MultiChannel')}
              key="-3"
              disabled
            />
            <TabPane
              className="single-tab"
              closable={false}
              tab={t('Product.Tab.Characteristics')}
              key="-5"
              disabled
            ></TabPane>
            <TabPane
              className="single-tab"
              closable={false}
              tab={t('Product.Tab.Media')}
              key="-6"
              disabled
            ></TabPane>
            <TabPane
              className="single-tab"
              closable={false}
              tab={t('Product.Tab.Statistic')}
              key="-8"
              disabled
            ></TabPane>
            <TabPane
              className="single-tab"
              closable={false}
              tab={t('Product.Tab.Files')}
              key="-9"
              disabled
            ></TabPane>
          </Tabs>
        </Styles.TabsContainer>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default ProductsManage;
