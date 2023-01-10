import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductCategoryUpsert from '../containers/ProductCategoryUpsert';
import { ProductCategory } from '../model/productCategory.entity';
import moduleInfo from '../ModuleInfo.json';
import ProductCategoryModule from '../ProductCategory.module';

const ProductCategoryUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { productCategory_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as ProductCategory);
  const [isLoading, setIsLoading] = useState(false);
  const productCategoryModule = new ProductCategoryModule();
  const title = productCategoryModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...productCategoryModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    productCategoryModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<ProductCategory> module={productCategoryModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <ProductCategoryUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default ProductCategoryUpsertPage;
