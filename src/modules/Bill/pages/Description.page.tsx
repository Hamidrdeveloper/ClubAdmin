import { AuthContext } from '@src/core';
import { ModalHeader, PageLayout, Panel } from '@src/shared/components';
import { Tabs } from 'antd';
import axios from 'axios';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BillModule } from '../Bill.module';
import { ABill, Bill } from '../model/bill.entity';

export default function DescriptionPage(): ReactElement {
  const params = useParams();
  const billId = +(params.bill_id ?? 0);
  const navigate = useNavigate();

  const {
    profile: { id },
  } = useContext(AuthContext);
  const billsModule = billId === -1 ? new BillModule(billId, [], id) : new BillModule(billId);

  const [label, setLabel] = useState<string>();
  // const {
  //   error,
  //   items,
  //   loading,
  //   hasNextPage,
  //   filterColumns,
  //   isFilterVisible,
  //   selectedFilters,
  //   performedFilters,
  //   tableColumns,
  //   setSelectedFilters,
  //   setPerformedFilters,
  //   onResetFilters,
  //   onSearchText,
  //   loadBills,
  //   onSortChange,
  //   setFilterVisible,
  // } = useLoadItems(params.bill_id);

  // const [infiniteRef] = useInfiniteScroll({
  //   loading,
  //   hasNextPage,
  //   disabled: !!error,
  //   onLoadMore: loadBills,
  //   rootMargin: '0px 0px 400px 0px',
  // });

  function fetchAbill() {
    const billId = params.bill_id !== '-1' ? '?id=' + params.bill_id : '';
    if (billId !== '') {
      axios.get('/abills' + billId).then((title) => {
        setLabel((title?.data as { data: ABill[] })?.data[0]?.name ?? '');
      });
    }
  }

  useEffect(() => {
    fetchAbill();
  }, []);

  return (
    <>
      <PageLayout<Bill> module={billsModule}>
        <PageLayout.Breadcrumb />

        <PageLayout.Panel>
          <Panel.Header
            hasSearch
            noListView
            noDescription
            module={billsModule}
            // onSearch={onSearchText}
            // onFilterButtonClick={() => setFilterVisible(true)}
          />

          <div style={{ margin: '24px' }}>
            <ModalHeader
              onClose={() => navigate('/admin/bills')}
              title={`Bills Description ${label ? ` - ${label}` : ''}`}
            />
          </div>

          <div style={{ margin: '24px' }}>
            <Tabs>
              <Tabs.TabPane tab="All" key="all">
                <Panel.ListView
                  module={billsModule}
                  tableScroll={{ x: 1450, y: 750 }}
                  updateLink="positions"
                  params={{ orderBy: { point: 'DESC' } }}
                />
              </Tabs.TabPane>

              <Tabs.TabPane tab="Euro" key="euro">
                <Panel.ListView
                  module={new BillModule(+(params.bill_id ?? 0), [15, 83, 157, 203, 1000])} // Euro Zone
                  tableScroll={{ x: 1450, y: 750 }}
                  updateLink="positions"
                  params={{ orderBy: { point: 'DESC' } }}
                />
              </Tabs.TabPane>

              <Tabs.TabPane tab="CHF" key="frank">
                <Panel.ListView
                  module={new BillModule(+(params.bill_id ?? 0), [216])} // CHF Zone
                  tableScroll={{ x: 1450, y: 750 }}
                  updateLink="positions"
                  params={{ orderBy: { point: 'DESC' } }}
                />
              </Tabs.TabPane>
            </Tabs>
          </div>

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
            <>
              <ModalHeader title="Bills Description" onClose={() => navigate('/admin/bills')} />
              <VirtualTable
                rowKey="id"
                loading={loading}
                pagination={false}
                dataSource={items}
                columns={tableColumns}
                onChange={onSortChange}
                scroll={{ x: 1400 }}
                size="small"
                tableLayout="auto"
                summary={(pageData) => {
                  let totalAmounts = 0;
                  let totalVats = 0;

                  pageData.forEach((data) => {
                    totalAmounts += (data?.['total_amount'] as number) ?? 0;
                    totalVats += (data?.['vat'] as number) ?? 0;
                  });

                  return (
                    <Table.Summary fixed>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                        <Table.Summary.Cell index={1} colSpan={12} />
                        <Table.Summary.Cell index={12} colSpan={2}>
                          <Typography.Text>
                            {intlCurrency(pageData?.[0]?.['currency']?.['iso3'] ?? 'EUR', totalAmounts)}
                          </Typography.Text>
                        </Table.Summary.Cell>
                        <Table.Summary.Cell index={14}>
                          <Typography.Text>
                            {intlCurrency(pageData?.[0]?.['currency']?.['iso3'] ?? 'EUR', totalVats)}
                          </Typography.Text>
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </Table.Summary>
                  );
                }}
              />
            </>
          </BillFilters> */}
        </PageLayout.Panel>
      </PageLayout>

      {/* This is Scroll Catch For Lazy Load - Window Should Visit This to FindOut When Send New Request */}
      {/* {hasNextPage && <div ref={infiniteRef} />} */}
    </>
  );
}
