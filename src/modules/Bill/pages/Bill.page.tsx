import { Loader } from '@shared/components';
import { AuthContext } from '@src/core';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ABillModule } from '../Bill.module';
import { ABill } from '../model/bill.entity';

export default function BillPage(): ReactElement {
  const billsModule = new ABillModule();

  const navigate = useNavigate();
  const { profile } = useContext(AuthContext);

  const isOrderReadOnly = !!profile.roles.find((role) => role.slug === 'partner');

  useEffect(() => {
    if (isOrderReadOnly) navigate('/admin/bills/description/-1');
  }, [isOrderReadOnly]);

  // const {
  //   error,
  //   items,
  //   loading,
  //   hasNextPage,
  //   tableColumns,
  //   filterColumns,
  //   isFilterVisible,
  //   selectedFilters,
  //   performedFilters,
  //   setSelectedFilters,
  //   setPerformedFilters,
  //   onResetFilters,
  //   onSearchText,
  //   loadBills,
  //   onSortChange,
  //   setFilterVisible,
  // } = useLoadItems();

  // const [infiniteRef] = useInfiniteScroll({
  //   loading,
  //   hasNextPage,
  //   disabled: !!error,
  //   onLoadMore: loadBills,
  //   rootMargin: '0px 0px 400px 0px',
  // });

  if (isOrderReadOnly) return <Loader title={'Loading Bills...'} />;

  return (
    <>
      <PageLayout<ABill> module={billsModule}>
        <PageLayout.Breadcrumb />

        <PageLayout.Panel>
          <Panel.Header
            hasSearch
            noListView
            noDescription
            hasNew
            newLink=""
            module={billsModule}
            // onSearch={onSearchText}
            // onFilterButtonClick={() => setFilterVisible(true)}
          />

          <Panel.ListView
            dontNavigate
            module={billsModule}
            tableScroll={{ x: 1450, y: 750 }}
            updateLink="description"
            params={{ orderBy: { id: 'DESC' } }}
          />

          {/* <BillFilters
            filters={filterColumns}
            isFilterVisible={isFilterVisible}
            setFilterVisible={setFilterVisible}
            selectedFilters={selectedFilters}
            performedFilters={performedFilters}
            onResetFilters={onResetFilters}
            setSelectedFilters={setSelectedFilters}
            setPerformedFilters={setPerformedFilters}
          >
            <Table
              rowKey="id"
              loading={loading}
              pagination={false}
              dataSource={items}
              columns={tableColumns}
              onChange={onSortChange}
            />
          </BillFilters> */}
        </PageLayout.Panel>
      </PageLayout>

      {/* This is Scroll Catch For Lazy Load - Window Should Visit This to FindOut When Send New Request */}
      {/* {hasNextPage && <div ref={infiniteRef} />} */}
    </>
  );
}
