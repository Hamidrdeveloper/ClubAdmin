import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Partner } from '../model/partner.entity';
import PartnerModule from '../Partner.module';

function removeActionColumn(tableColumns: ColumnsType<Partner>): ColumnsType<Partner> {
  const actionColumnIndex = tableColumns.findIndex((col) => col.title === i18n.t('Partner.Field.Action'));
  tableColumns.splice(actionColumnIndex, 1);

  return tableColumns;
}

export default function PartnerPage(): ReactElement {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { role } = useContext(AuthContext);
  const partnerModule = new PartnerModule();

  const handleUpdate = (data: Partner) => {
    if (role !== 'partner') navigate(`/admin/users/manage/partner/${data.user_id}?active=7`);
  };

  if (role === 'partner') {
    partnerModule.tableColumns = removeActionColumn(partnerModule.tableColumns);
  }

  return (
    <PageLayout<Partner> module={partnerModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew hasSearch newLink="/admin/users/manage/partner/?mode=partner" />

        <Panel.ListView
          dontNavigate
          module={partnerModule}
          hasUpdate={false}
          hasActive={false}
          onUpdateWithModel={handleUpdate}
          togglers={
            role === 'partner'
              ? []
              : [
                  {
                    url: 'active',
                    sorter: true,
                    dataIndex: 'is_active',
                    title: t('Global.Active'),
                  },
                ]
          }
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
