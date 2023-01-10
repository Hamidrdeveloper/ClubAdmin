import ExportLogPage from '@src/modules/ExportLogs/pages/ExportLogs.page';
import { Loader, ModalHeader, PageLayout } from '@src/shared/components';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement } from 'react';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

import ExportSettingUpsert from '../container/ExportSettingUpsert';
import ExportSettingModule from '../ExportSetting.module';
import { ExportSettingModel } from '../model/ExportsSettings.entity';
import { getOneExportDataSetting } from '../service/Setting.service';

const ExportSettingUpsertPage = (): ReactElement => {
  const module = useMemo(() => new ExportSettingModule(), []);
  const navigate = useNavigate();
  const { export_setting_id: id } = useParams();
  const { title } = module;

  const { data: singleData, isLoading } = useQuery(['export-data-setting', id], () =>
    id ? getOneExportDataSetting(id) : undefined,
  );

  const routes = [
    {
      path: '/admin/exports/export-settings',
      breadcrumbName: `Export Settings`,
    },
    {
      path: '',
      breadcrumbName: id ? `Update ${title[0]} - ${id}` : `New ${title[0]}`,
    },
  ];

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<ExportSettingModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader items={routes} />
          </div>
          {isLoading ? <Loader /> : <ExportSettingUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>

        <ExportLogPage exportSettginId={id} />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default ExportSettingUpsertPage;
