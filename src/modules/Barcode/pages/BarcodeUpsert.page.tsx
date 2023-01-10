import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BarcodeModule from '../Barcode.module';
import BarcodeUpsert from '../containers/BarcodeUpsert';
import { Barcode } from '../model/barcode.entity';
import moduleInfo from '../ModuleInfo.json';

const BarcodeUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { barcode_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Barcode);

  const [isLoading, setIsLoading] = useState(false);
  const barcodeModule = new BarcodeModule();
  const title = barcodeModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...barcodeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    barcodeModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Barcode> module={barcodeModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <BarcodeUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default BarcodeUpsertPage;
