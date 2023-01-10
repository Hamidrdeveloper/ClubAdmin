import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import { togglersProps } from '@src/shared/components/PageLayout/Lists/ListView.type';
import { ColumnsType } from 'antd/lib/table';
import React, { ReactElement, useContext, useMemo } from 'react';

import CompetitionModule from '../Competition.module';
import { CompetitionModel } from '../model/Competition.entity';

const CompetitionListView = ({ activeTab }: { activeTab: string }): ReactElement => {
  const { loggedInUserRole } = useContext(AuthContext);
  const module = new CompetitionModule();

  if (loggedInUserRole === 'partner') {
    module?.tableColumns?.splice(5, 1);
  }

  const togglers = useMemo(() => {
    const finalToggler: togglersProps[] = [];

    switch (activeTab) {
      case 'active': {
        finalToggler.push({
          url: 'is-active',
          title: i18n.t('Global.Active'),
          dataIndex: 'is_active',
          disabled: 'activable',
        });
        break;
      }
      case 'inactive': {
        finalToggler.push({
          url: 'is-active',
          title: i18n.t('Global.Active'),
          dataIndex: 'is_active',
          disabled: 'activable',
        });
        break;
      }
    }

    return finalToggler;
  }, [activeTab]);

  if (activeTab !== 'active' || loggedInUserRole !== 'partner') {
    // remove cancel button if 1. is not active competitions || 2. is not logged with partner
    module.tableColumns = removeTableColumn({
      key: 'cancel-participation',
      tableColumns: module.tableColumns,
    });
  }

  if (activeTab === 'active') {
    // remove calculate button on active competitions
    module.tableColumns = removeTableColumn({ key: 'calculate', tableColumns: module.tableColumns });
  }

  return (
    <PageLayout<CompetitionModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          module={module}
          updateLink="manage"
          togglers={togglers}
          params={generateParams(activeTab)}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

function generateParams(value: string): Record<string, unknown> {
  switch (value) {
    case 'active': {
      return { isActive: true, hasEnded: false };
    }
    case 'inactive': {
      return { isActive: false, hasEnded: false };
    }
    case 'ended': {
      return { hasEnded: true };
    }
    default: {
      return {};
    }
  }
}

type removeColParams = {
  key: string;
  tableColumns: ColumnsType;
};

function removeTableColumn({ key, tableColumns }: removeColParams) {
  const columns = tableColumns.slice();

  const foundColIndex = columns.findIndex((col) => col.key === key);
  if (foundColIndex > -1) {
    columns.splice(foundColIndex, 1);
  }

  return columns.slice();
}
export default CompetitionListView;
