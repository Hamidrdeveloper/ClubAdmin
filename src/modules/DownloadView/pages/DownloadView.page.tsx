import { getAllDownloadFiles } from '@src/modules/Download/service/downloadFile.service';
import { Loader } from '@src/shared/components';
import HeaderStyle from '@src/shared/components/PageLayout/Header/Header.style';
import PageLayoutStyle from '@src/shared/components/PageLayout/PageLayout.style';
import { Col, MenuProps, Row, Typography } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import DownloadViewMenu from '../components/DownloadViewMenu';
import FilesView from '../components/FilesView';
import { getAllDownloadCategories } from '../service/category.service';

export default function DownloadViewPage(): ReactElement {
  const { t } = useTranslation();

  const { data: itemsData, isLoading: isItemsLoading } = useQuery(
    'getAllDownloadCategories',
    getAllDownloadCategories,
  );
  const [selectedOptionMenu, setSelectedOptionMenu] = useState<string | undefined>();

  const { data: filesData, isLoading: isFilesLoading } = useQuery(
    `getAllDownloadFiles-Category${selectedOptionMenu}`,
    () => (selectedOptionMenu ? getAllDownloadFiles(+selectedOptionMenu) : undefined),
  );

  const optionChangeHandler: MenuProps['onClick'] = ({ key }) => setSelectedOptionMenu(key);

  return (
    <PageLayoutStyle.MainContainer>
      <HeaderStyle.Header>
        <HeaderStyle.MainContainer>
          <div className="title">
            <Typography.Title level={3}>{t('DownloadView.Title', { count: 2 })}</Typography.Title>
          </div>
        </HeaderStyle.MainContainer>
      </HeaderStyle.Header>

      <Row>
        <Col>
          {isItemsLoading ? (
            <Loader />
          ) : (
            <DownloadViewMenu
              items={itemsData}
              onOptionChange={optionChangeHandler}
              selectedDownloadCategory={selectedOptionMenu}
            />
          )}
        </Col>

        <Col span={18}>{isFilesLoading ? <Loader /> : <FilesView files={filesData} />}</Col>
      </Row>
    </PageLayoutStyle.MainContainer>
  );
}
