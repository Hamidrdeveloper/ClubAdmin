import { FactoryModule } from '@src/shared/models';
import React, { Key, ReactElement, ReactNode, lazy, useEffect, useState } from 'react';

import Styles from './PageLayout.style';
import { PageLayoutPropsContext } from './PageLayout.type';

const PageLayoutPanelContext = React.createContext<PageLayoutPropsContext | undefined>(undefined);

export const usePageLayout = (): PageLayoutPropsContext => {
  const context = React.useContext(PageLayoutPanelContext);
  if (!context) {
    throw new Error('This component must be used within a <PageLayout> component.');
  }
  return context;
};
function PageLayoutPanel<T>({
  module,
  children,
  noOverflow,
  onListViewChange,
  defaultListView = 'list',
}: {
  children: ReactNode;
  noOverflow?: boolean;
  module?: FactoryModule<T>;
  defaultListView?: 'list' | 'tiles' | 'longTiles';
  onListViewChange?: (listView: string) => void;
}): ReactElement {
  const [singleData, setSingleData] = useState<T>();
  const [listView, setListView] = useState<string>(defaultListView);
  const [requestUpdate, setRequestUpdate] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>({});
  const [isDetailVisible, setDetailVisible] = useState(false);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedRows, setSelectedRows] = useState<Key[]>([]);
  const [selectedRowsData, setSelectedRowsData] = useState<T[]>([]);

  useEffect(() => {
    onListViewChange?.(listView);
  }, [listView]);

  const memoizedContextValue = React.useMemo(
    () => ({
      params,
      singleData,
      listView,
      selectedRows,
      selectedRowsData,
      isFilterVisible,
      isDetailVisible,
      isModalVisible,
      requestUpdate,
      setParams,
      setSingleData,
      setListView,
      setSelectedRows,
      setFilterVisible,
      setDetailVisible,
      setModalVisible,
      setRequestUpdate,
      setSelectedRowsData,
    }),
    [
      params,
      singleData,
      listView,
      selectedRows,
      isFilterVisible,
      selectedRowsData,
      isDetailVisible,
      isModalVisible,
      requestUpdate,
      setParams,
      setSingleData,
      setListView,
      setSelectedRows,
      setFilterVisible,
      setDetailVisible,
      setModalVisible,
      setRequestUpdate,
      setSelectedRowsData,
    ],
  );

  return (
    <PageLayoutPanelContext.Provider value={memoizedContextValue}>
      <Styles.MainContainer noOverflow={noOverflow}>
        {React.Children.toArray(children).map((child: ReactElement) => React.cloneElement(child, { module }))}
      </Styles.MainContainer>
    </PageLayoutPanelContext.Provider>
  );
}

PageLayoutPanel.Header = lazy(() => import('./Header/Header'));
PageLayoutPanel.ListView = lazy(() => import('./Lists/ListView'));

export default PageLayoutPanel;
