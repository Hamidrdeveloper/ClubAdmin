import { generalAtom } from '@src/modules/General/service/generalStore';
import { Loader } from '@src/shared/components';
import { Empty, Space, Switch, Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import MLMUpsert from '../containers/MLMUpsert';
import VariationAttributesUpsert from '../containers/VariationAttributesUpsert';
import VariationFilesUpsert from '../containers/VariationFilesUpsert';
import VariationMultiUpsert from '../containers/VariationMultiUpsert';
import VariationPackageUpsert from '../containers/VariationPackageUpsert';
import VariationPricesUpsert from '../containers/VariationPriceUpsert';
import VariationSettingsUpsert from '../containers/VariationSettingsUpsert';
import VariationSupplierUpsert from '../containers/VariationSupplierUpsert';
import VariationTextUpsert from '../containers/VariationTextUpsert';
import VariationVatsUpsert from '../containers/VariationVatsUpsert';
import { Product } from '../model/Product.entity';
import { ProductVariation } from '../model/ProductVariation.entity';
import { getOneVariation, updateVariation } from '../services';
import { variationIdAtom } from '../services/variationStore';
import StockManage from './StockManage.page';
import Styles from './styles/VariationManage.style';

const { TabPane } = Tabs;

interface variationManageProps {
  product: Product;
  variationId?: number | null;
  onCreate?: (id: number) => void;
  readonly productId: number;
}

const VariationManage: React.FC<variationManageProps> = ({ product, productId, variationId, onCreate }) => {
  // atom usage: to use in stock tabs. (instead of sending props to 3 child components)
  const [, setVariationId] = useAtom(variationIdAtom);

  const { t } = useTranslation();
  const [generalConfig] = useAtom(generalAtom);
  const isMLMActive = generalConfig.is_mlm_active;
  const [isMulti, setMulti] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [multiVariationLoading, setMultiVariationLoading] = useState<boolean>(false);

  const {
    refetch,
    isFetching,
    data: variation,
    isLoading: isPending,
  } = useQuery(
    ['variation', variationId],
    () => (variationId ? getOneVariation(variationId) : Promise.resolve({} as ProductVariation)),
    {
      onSuccess: (data) => {
        setMulti(data?.type === 'multi');
      },
    },
  );

  useEffect(() => {
    setVariationId(variationId);
  }, [variationId]);

  const handleCreateCallback = (data: ProductVariation) => {
    if (!variationId && onCreate) {
      onCreate(data.id);
    }
  };

  const handleMultiChange = (checked: boolean) => {
    if (variationId) {
      setMultiVariationLoading(true);
      updateVariation(Number(variationId), {
        product_id: productId,
        is_main: variation?.is_main,
        type: isMulti ? 'single' : 'multi',
        availability_id: variation?.availability.id,
      })
        .then(() => {
          setMulti(checked);
          setMultiVariationLoading(false);
        })
        .catch(() => setMultiVariationLoading(false));
    }
  };

  return (
    <Styles.TabsContainer>
      {isPending || !variation ? (
        <Loader title={t('Product.VariationLoader')} />
      ) : (
        <Tabs
          animated
          type="card"
          defaultActiveKey="1"
          activeKey={activeTab}
          className="variation-tabs"
          onChange={(activeTab) => setActiveTab(activeTab)}
        >
          <TabPane className="single-tab" tab={t('Product.Tab.Settings')} key="1">
            <VariationSettingsUpsert
              isMulti={isMulti}
              product={product}
              productId={productId}
              singleData={variation}
              variationId={variationId}
              onCallback={handleCreateCallback}
            />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Texts')} key="2" disabled={!variationId}>
            <VariationTextUpsert
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{ translate: variation.translate }}
            />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.CountryVats')} key="5" disabled={!variationId}>
            <VariationVatsUpsert
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{ productVariationVats: variation.productVariationVats }}
              // On Setting new Country Vat we need to refetch data so when we change tabs (specially in prices) we need to use updated vat data
            />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Prices')} key="3" disabled={!variationId}>
            <VariationPricesUpsert
              variation={variation}
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{
                userVariationPrices: variation.userVariationPrices,
                productVariationPrices: variation.productVariationPrices,
              }}
            />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Suppliers')} key="10" disabled={!variationId}>
            <VariationSupplierUpsert singleData={variation?.productVariationSuppliers} />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Packages')} key="4" disabled={!variationId}>
            <VariationPackageUpsert
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{ packages: variation.packages }}
            />
          </TabPane>

          <TabPane
            key="6"
            className="single-tab"
            disabled={!variationId}
            tab={
              <Space>
                <span>{t('Product.Tab.MultiVariation')}</span>
                <Switch
                  checked={isMulti}
                  className="multi-switch"
                  onChange={handleMultiChange}
                  loading={multiVariationLoading}
                />
              </Space>
            }
          >
            {isMulti ? (
              <VariationMultiUpsert
                isFetching={isFetching}
                variationId={variation.id}
                onCallback={() => refetch()}
                singleData={{
                  multiProductVariations: variation.multiProductVariations.map(
                    ({ multi_variation_quantity, ...rest }) => ({
                      quantity: Number(multi_variation_quantity),
                      variation: { multi_variation_quantity: Number(multi_variation_quantity), ...rest },
                    }),
                  ),
                }}
              />
            ) : (
              <Empty
                style={{ marginTop: 64 }}
                description={t('Product.Tab.ShouldActiveMultiProductVariation')}
              />
            )}
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Attributes')} key="7" disabled={!variationId}>
            <VariationAttributesUpsert
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{
                attributes: variation.attributes,
                productVariationCategories: variation.productVariationCategories,
              }}
            />
          </TabPane>

          <TabPane className="single-tab" tab={t('Product.Tab.Files')} key="8" disabled={!variationId}>
            <VariationFilesUpsert
              isFetching={isFetching}
              variationId={variation.id}
              onCallback={() => refetch()}
              singleData={{ productVariationFiles: variation.productVariationFiles }}
            />
          </TabPane>

          <TabPane
            className="single-tab"
            closable={false}
            tab={t('Product.Tab.Stock')}
            key="9"
            disabled={!variationId}
          >
            <StockManage />
          </TabPane>

          <TabPane
            className="single-tab"
            closable={false}
            tab={t('Product.Tab.MLM')}
            key="11"
            disabled={!isMLMActive || !variationId}
          >
            <MLMUpsert />
          </TabPane>
        </Tabs>
      )}
    </Styles.TabsContainer>
  );
};

export default VariationManage;
