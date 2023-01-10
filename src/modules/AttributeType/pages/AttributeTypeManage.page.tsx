import i18n from '@src/core/i18n/config';
import MultiAttributeOptionsUpsert from '@src/modules/AttributeOptions/containers/MultipleAttributeOptionsUpsert';
import { Loader, PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import AttributeTypeModule from '../AttributeType.module';
import AttributeTypeUpsert from '../containers/AttributeTypeUpsert';
import { AttributeTypes } from '..';

const AttributeTypeManage = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { attributeType_id: id } = useParams();
  const attributeTypeModule = new AttributeTypeModule();

  const createMode = !id;
  const [activeTab, setActiveTab] = useState<string>('1');

  const { data, isLoading, refetch } = useQuery(`attribute-type-${id}`, () => {
    return id ? attributeTypeModule.apiService.getOne(+id) : undefined;
  });

  const goBack = () => {
    navigate(-1);
  };

  const title = attributeTypeModule.title[0];

  const routes = [
    ...attributeTypeModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  const onUpsertSuccess = () => {
    refetch();
  };

  const onTypeUpsertSuccess = () => {
    if (createMode) goBack();

    refetch();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PageLayout<AttributeTypes> module={attributeTypeModule}>
          <PageLayout.Breadcrumb routes={routes} />

          <PageLayout.Panel>
            <TabsContainer>
              <Tabs
                type="card"
                className="attribute-type-tabs"
                activeKey={activeTab}
                destroyInactiveTabPane
                onChange={(activeTab) => {
                  // in case of ?page=2&per_page=... - removes search params on tab change
                  navigate('./', { replace: true });

                  setActiveTab(activeTab);
                }}
              >
                <Tabs.TabPane key={'1'} tab={t('AttributeType.Tabs.Settings')}>
                  <AttributeTypeUpsert singleData={data} onCallback={onTypeUpsertSuccess} />
                </Tabs.TabPane>

                <Tabs.TabPane key={'2'} tab={t('AttributeType.Tabs.Options')} disabled={createMode}>
                  <MultiAttributeOptionsUpsert
                    singleData={data?.attributeTypeOptions.sort((a, b) => b.id - a.id)}
                    onCallback={onUpsertSuccess}
                  />
                </Tabs.TabPane>
              </Tabs>
            </TabsContainer>
          </PageLayout.Panel>
        </PageLayout>
      )}
    </>
  );
};

export default AttributeTypeManage;

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
