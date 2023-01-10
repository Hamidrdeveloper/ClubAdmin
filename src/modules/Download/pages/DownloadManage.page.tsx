import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import DownloadCategoryUpsert from '../container/DownloadCategoryUpsert';
import DownloadFileUpsert from '../container/DownloadFileUpsert';
import DownloadCategoryModule from '../Download.module';
import { DownloadCategoryModel } from '../model/DownloadCategory.entity';
import { selectedCategoryAtom } from '../service/DownloadCategory.store';
import { getAllDownloadFiles } from '../service/downloadFile.service';

const DownloadManage = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { download_id: _id } = useParams();
  const module = new DownloadCategoryModule();

  const [id, setId] = useState<string | number | undefined>(_id);
  const createMode = !id;
  const [activeTab, setActiveTab] = useState<string>('1');
  const [, setSelectedDownloadCat] = useAtom(selectedCategoryAtom);

  const { data, isLoading, refetch } = useQuery(
    `download-categories/${id}`,
    () => {
      return id ? module.apiService.getOne(+id) : undefined;
    },
    { onSuccess: (data: DownloadCategoryModel) => setSelectedDownloadCat(data) },
  );

  const { data: filesData, isLoading: filesLoading } = useQuery(`download-files/${id}`, () => {
    return id ? getAllDownloadFiles(+id) : undefined;
  });

  const title = module.title[0];

  const routes = [
    ...module.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  const onCategoryUpsertSuccess = (data: DownloadCategoryModel) => {
    if (createMode) {
      setId(data.id);
      navigate(`/admin/downloads/manage/${data.id}`, { replace: true });
      setActiveTab('2');
    }
    refetch();
  };

  return (
    <>
      {isLoading && filesLoading ? (
        <Loader />
      ) : (
        <PageLayout<DownloadCategoryModel> module={module}>
          <PageLayout.Breadcrumb routes={routes} />

          <PageLayout.Panel>
            <TabsContainer>
              <Tabs
                type="card"
                activeKey={activeTab}
                destroyInactiveTabPane
                className="download-tabs"
                onChange={(activeTab) => {
                  // in case of ?page=2&per_page=... - removes search params on tab change
                  navigate('./', { replace: true });

                  setActiveTab(activeTab);
                }}
              >
                <Tabs.TabPane key={'1'} tab={t('Download.Category.TabTitle')}>
                  <DownloadCategoryUpsert singleData={data} onCallback={onCategoryUpsertSuccess} />
                </Tabs.TabPane>

                <Tabs.TabPane key={'2'} tab={t('Download.File.TabTitle')} disabled={createMode}>
                  <DownloadFileUpsert filesData={filesData} />
                </Tabs.TabPane>
              </Tabs>
            </TabsContainer>
          </PageLayout.Panel>
        </PageLayout>
      )}
    </>
  );
};

export default DownloadManage;

const TabsContainer = styled.div`
  padding: 32px 16px;
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;

  & .content {
    padding: 12px 0;
  }

  & .stock-tabs .ant-tabs-nav-list {
    margin-left: 0;

    & .ant-tabs-tab {
      flex: 1;
      display: flex;
      justify-content: center;
    }
    & .ant-tabs-tab-active {
      background-color: #009ddc;

      & .ant-tabs-tab-btn {
        color: white;
      }
    }
  }
`;
