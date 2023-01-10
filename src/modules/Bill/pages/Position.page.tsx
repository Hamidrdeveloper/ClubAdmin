import { CloseOutlined } from '@ant-design/icons';
import Styles from '@shared/components/PageLayout/Lists/ListView.style';
import i18n from '@src/core/i18n/config';
import { User } from '@src/modules/User';
import { Loader, ModalHeader, PageLayout, Panel } from '@src/shared/components';
import FilterContainer from '@src/shared/components/PageLayout/Lists/Filters';
import { FilterColumns } from '@src/shared/components/PageLayout/Lists/ListView.type';
import { PaginationRequest, ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { intlCurrency } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Divider, Space, Spin, Table, TablePaginationConfig, Typography } from 'antd';
import { ColumnsType, SorterResult } from 'antd/lib/table/interface';
import Text from 'antd/lib/typography/Text';
import axios from 'axios';
import queryString from 'query-string';
import React, { ReactElement, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { ABillModule } from '../Bill.module';
import { VirtualTable } from '../components/VirtualTable';
import { ABill, Bill, BillPosition } from '../model/bill.entity';
import { automatePaginateByAPIService } from '.';

export default function BillPositionPage(): ReactElement {
  const barcodeModule = new ABillModule();
  // Filter & Sort
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pageParams = queryString.parse(search);
  // Filter & Sort
  const [filterColumns, setFilterColumns] = useState<FilterColumns[]>([]);
  const [tableColumns, setTableColumns] = useState<ColumnsType<BillPosition>>([]);
  const [params, setParams] = useState<Record<string, unknown>>({});
  const [selectedParams, setSelectedParams] = useState<FilterColumns[]>([]);
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [label, setLabel] = useState<{ abillTitle: string; billTitle: string }>();

  //
  const { bill_id, position_id } = useParams();

  const [data, setData] = useState<BillPosition[]>();
  const [response, setResponse] = useState<ResponseContext<BillPosition[]>>();

  const fetchMyAPI = async () => {
    let response: ResponseContext<BillPosition[]> = {} as any;
    const automatePagination = automatePaginateByAPIService({
      service: new ApiBuilder<BillPosition>('/bill_positions'),
      params: { ...params, orderBy: pageParams.orderBy ?? { type: 'desc' }, billId: position_id },
    });

    for await (const abillsListRetrivedByAPI of automatePagination) {
      setData((prevData) => {
        const preData = prevData ?? [];
        preData.push(...abillsListRetrivedByAPI.data);
        return preData;
      });
      response = abillsListRetrivedByAPI;
    }
    //
    setResponse(response);
  };

  function fetchAbill() {
    axios.get('/abills?id=' + bill_id).then((title) => {
      setLabel((label) => ({
        billTitle: label?.billTitle ?? '',
        abillTitle: (title?.data as { data: ABill[] })?.data[0]?.name ?? '',
      }));
    });
  }

  function fetchBill() {
    axios.get('/bills?id=' + position_id).then((title) => {
      setLabel((label) => ({
        billTitle: (title?.data as { data: Bill[] })?.data[0]?.company_name ?? '',
        abillTitle: label?.abillTitle ?? '',
      }));
    });
  }

  useEffect(() => {
    setData(undefined);
    fetchMyAPI();
  }, [params, pageParams.orderBy, search]);

  useEffect(() => {
    fetchAbill();
    fetchBill();
  }, []);

  const [choices, setChoices] = useState<'All' | 'Currency' | 'Type' | 'CurrencyType'>('Type');

  const defaultTableColumns = BillColumns({
    IdComponent: (id) => <span>{id}</span>,
    OrderComponent: (id) => <Link to={`/admin/orders/order-sale/${id}`}>{id}</Link>,
    PositionTypeComponent: (type) => <span>{type?.name ?? ' - '}</span>,
    CurrencyComponent: (price, allData) => (
      <span>{intlCurrency(allData.currency?.iso3 ?? 'EUR', price)}</span>
    ),
    UserComponent: (user) => <span>{user?.person?.full_name ?? ' - '}</span>,
    CurrencyNameComponent: (factor) => <span>{factor === 1 ? 'EUR' : 'CHF'}</span>,
  }) as any;

  const filterTableHandler = (filters) => {
    setParams(filters);
  };

  const filterResetHandler = () => {
    setParams({});
    setSelectedParams([]);
  };

  useEffect(() => {
    setParams(params);

    if (pageParams && pageParams.orderBy) {
      const orderBy = JSON.parse(pageParams.orderBy as string);
      const orderByKey = Object.keys(orderBy)[0];

      setTableColumns(
        defaultTableColumns.map((column) =>
          column.dataIndex !== orderByKey
            ? column
            : {
                ...column,
                defaultSortOrder: orderBy[orderByKey] === 'ASC' ? 'ascend' : 'descend',
              },
        ),
      );
    } else setTableColumns(defaultTableColumns);
  }, [pageParams.orderBy]);

  useEffect(() => {
    if (response && filterColumns.length === 0) {
      if (response.meta.filters) {
        const filtersArr: FilterColumns[] = [];
        Object.keys(response.meta.filters).forEach((key) => {
          const filterValue = response.meta.filters[key];
          if (key !== 'ids') {
            filtersArr.push({
              key,
              type: filterValue,
              isSelect: String(key).includes('Id'),
              selectUrl: String(key).includes('Id') ? response.meta.filterLinks[key] : undefined,
            });
          }
        });

        // NOTE: Sort By Type -> 1. String 2. Number(int, float) - 3. Select - 4.Bool
        filtersArr.sort((a, b) => {
          switch (a.type) {
            case 'string':
              return -1;

            case 'float':
              return b.type === 'string' ? 1 : -1;

            case 'int':
              if (!a.isSelect || !b.isSelect) return b.type === 'string' || b.type === 'float' ? 1 : -1;
              else if (a.isSelect && !b.isSelect) return 1;
              else if (!a.isSelect && b.isSelect) return -1;
              else if (a.isSelect && b.isSelect) return 0;

            case 'boolean':
              return b.type === 'string' || b.type === 'int' || b.type === 'float' ? 1 : -1;

            default:
              return 0;
          }
        });

        setFilterColumns(filtersArr);
      }
    }
  }, [data]);

  const handleSortChange = (
    p: TablePaginationConfig,
    f: Record<string, any>,
    sorter: SorterResult<BillPosition>,
  ) => {
    if (Object.keys(p).length > 0 && Object.keys(f).length > 0) {
      // Just For Preventing Unsed Variable Warning and non-used vars.
      console.log(p, f);
    }

    const { query } = queryString.parseUrl(pathname + search);
    if (sorter && sorter.columnKey && sorter.order && sorter.column && sorter.column.dataIndex) {
      const dataIndex = sorter.column.dataIndex as string;
      navigate(
        `?${queryString.stringify(
          {
            ...query,
            orderBy: JSON.stringify({
              [dataIndex]: sorter.order === 'ascend' ? 'ASC' : 'DESC',
            }),
          },
          { encode: false },
        )}`,
      );
    } else {
      const pageQueries: PaginationRequest = {
        page: query.page ? Number(query.page) : 1,
        per_page: query.per_page ? Number(query.per_page) : 10,
        search: query.search ? String(query.search) : undefined,
      };

      navigate(`?${queryString.stringify(pageQueries)}`);
    }
  };

  const Tables = (): ReactElement => {
    switch (choices) {
      case 'All':
        return (
          <Spin spinning={!data}>
            <VirtualTable
              size="small"
              onChange={handleSortChange}
              scroll={{
                x: '100vw',
              }}
              dataSource={data ?? []}
              columns={
                tableColumns.map((column) => {
                  return response?.meta.orderByColumns?.includes(column['dataIndex'] as string)
                    ? { ...column, sorter: true }
                    : column;
                }) as any
              }
              summary={summaries}
            />
          </Spin>
        );

      case 'Currency':
        const c_values = groupBy<BillPosition>(data ?? [], (single) =>
          String((single.currency_id ?? -1) + 'A'),
        );
        return (
          <>
            {Object.keys(c_values).map((key) => (
              <Spin spinning={!data}>
                <h3>{c_values?.[key]?.[0]?.currency?.name ?? 'No Name: '}</h3>
                <VirtualTable
                  size="small"
                  onChange={handleSortChange}
                  scroll={{
                    x: '100vw',
                  }}
                  dataSource={c_values[key]}
                  columns={
                    tableColumns.map((column) => {
                      return response?.meta.orderByColumns?.includes(column['dataIndex'] as string)
                        ? { ...column, sorter: true }
                        : column;
                    }) as any
                  }
                  summary={summaries}
                />
                <Divider />
              </Spin>
            ))}
          </>
        );

      case 'Type':
        const t_values = groupBy<BillPosition>(data ?? [], (single) => String((single.type_id ?? -1) + 'A'));
        return (
          <>
            {Object.keys(t_values).map((key) => (
              <Spin spinning={!data}>
                <h3>{t_values[key][0].type.name ?? 'No Name: '}</h3>
                <VirtualTable
                  size="small"
                  onChange={handleSortChange}
                  scroll={{
                    x: '100vw',
                  }}
                  dataSource={t_values[key]}
                  columns={
                    tableColumns.map((column) => {
                      return response?.meta.orderByColumns?.includes(column['dataIndex'] as string)
                        ? { ...column, sorter: true }
                        : column;
                    }) as any
                  }
                  summary={summaries}
                />
                <Divider />
              </Spin>
            ))}
          </>
        );

      case 'CurrencyType':
        const ct_values_c = groupBy<BillPosition>(data ?? [], (single) =>
          String((single.currency_id ?? -1) + 'A'),
        );
        const ct_values_t = groupBy<BillPosition>(data ?? [], (single) =>
          String((single.type_id ?? -1) + 'A'),
        );
        //
        return (
          <>
            {Object.keys(ct_values_c).map((key) => (
              <Spin spinning={!data}>
                <h3>{ct_values_c[key][0].currency?.name ?? 'No Name: '}</h3>
                <VirtualTable
                  size="small"
                  onChange={handleSortChange}
                  scroll={{
                    x: '100vw',
                  }}
                  dataSource={ct_values_c[key]}
                  columns={
                    tableColumns.map((column) => {
                      return response?.meta.orderByColumns?.includes(column['dataIndex'] as string)
                        ? { ...column, sorter: true }
                        : column;
                    }) as any
                  }
                  summary={summaries}
                />
              </Spin>
            ))}

            <Divider />

            {Object.keys(ct_values_t).map((key) => (
              <Spin spinning={!data}>
                <h3>{ct_values_t[key][0].type?.name ?? 'No Name: '}</h3>
                <VirtualTable
                  size="small"
                  onChange={handleSortChange}
                  scroll={{
                    x: '100vw',
                  }}
                  dataSource={ct_values_t[key]}
                  columns={
                    tableColumns.map((column) => {
                      return response?.meta.orderByColumns?.includes(column['dataIndex'] as string)
                        ? { ...column, sorter: true }
                        : column;
                    }) as any
                  }
                  summary={summaries}
                />
              </Spin>
            ))}
          </>
        );
    }
  };

  const summaries = (pageData: BillPosition[]) => {
    let totalAmounts = 0;
    const iso3 = pageData[0]?.factor === 1 ? 'EUR' : 'CHF';

    pageData.forEach(({ amount, factor }) => {
      totalAmounts += (amount ?? 0) * factor;
    });

    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
          <Table.Summary.Cell index={1} colSpan={5} />
          <Table.Summary.Cell index={6}>
            <Text>{intlCurrency(iso3, totalAmounts)}</Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };
  return (
    <PageLayout<BillPosition> module={barcodeModule as any}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch noDescription noListView onFilterButtonClick={() => setFilterVisible(true)} />

        <div style={{ padding: '16px' }}>
          <Styles.FilterArea collapsed={isFilterVisible}>
            <Styles.FilterContainer collapsed={isFilterVisible}>
              <div className="header">
                <Typography.Title level={4}>Filter</Typography.Title>

                <Button
                  type="text"
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => setFilterVisible(false)}
                />
              </div>

              <FilterContainer
                defSelectedValues={params}
                defSelectedFilters={selectedParams}
                filters={filterColumns}
                onSubmit={(val, fields) => {
                  filterTableHandler(val);
                  setSelectedParams(fields ?? []);
                }}
                onReset={filterResetHandler}
              />
            </Styles.FilterContainer>
            <Styles.ListContainer collapsed={isFilterVisible}>
              <Space direction="horizontal">
                <Checkbox
                  checked={choices === 'All'}
                  onChange={(e) => setChoices(e.target.checked ? 'All' : 'CurrencyType')}
                >
                  All
                </Checkbox>
                <Checkbox
                  checked={choices === 'Currency' || choices === 'CurrencyType'}
                  onChange={(e) =>
                    setChoices(
                      choices === 'All'
                        ? 'Currency'
                        : e.target.checked
                        ? choices === 'Type'
                          ? 'CurrencyType'
                          : 'Currency'
                        : choices === 'CurrencyType'
                        ? 'Type'
                        : 'All',
                    )
                  }
                >
                  Currency
                </Checkbox>
                <Checkbox
                  checked={choices === 'Type' || choices === 'CurrencyType'}
                  onChange={(e) =>
                    setChoices(
                      choices === 'All'
                        ? 'Type'
                        : e.target.checked
                        ? choices === 'Currency'
                          ? 'CurrencyType'
                          : 'Type'
                        : choices === 'CurrencyType'
                        ? 'Currency'
                        : 'All',
                    )
                  }
                >
                  Type
                </Checkbox>
              </Space>
              <Divider />
              <ModalHeader
                title={`Bills Positions - ${label?.abillTitle} - ${label?.billTitle}`}
                onClose={() => navigate(-1)}
              />
              <div style={{ padding: '32px' }}>{!data ? <Loader /> : Tables()}</div>
            </Styles.ListContainer>
          </Styles.FilterArea>
        </div>
      </PageLayout.Panel>
    </PageLayout>
  );
}

type ColumnsProps = {
  IdComponent: (id: number) => ReactElement;
  OrderComponent: (id: number) => ReactElement;
  PositionTypeComponent: (type: { name: string }) => ReactElement;
  CurrencyComponent: (price: number, allData: BillPosition) => ReactElement;
  UserComponent: (user: User) => ReactElement;
  CurrencyNameComponent: (factor: number) => ReactElement;
};

const BillColumns = ({
  IdComponent,
  OrderComponent,
  PositionTypeComponent,
  CurrencyComponent,
  UserComponent,
  CurrencyNameComponent,
}: ColumnsProps) => [
  {
    key: 'id',
    className: 'id number',
    dataIndex: 'id',
    title: i18n.t('Global.ID'),
    fixed: 'left' as any,
    render: IdComponent,
    width: 100,
  },
  {
    key: 'type',
    dataIndex: 'type',
    title: i18n.t('Bill.Field.PositionType'),
    render: PositionTypeComponent,
    width: 350,
  },
  {
    key: 'buyer',
    dataIndex: 'buyer',
    title: i18n.t('Bill.Field.Buyer'),
    render: UserComponent,
    width: 200,
  },
  {
    key: 'bill_id',
    dataIndex: 'bill_id',
    title: i18n.t('Bill.Field.BillId'),
    width: 70,
  },
  {
    key: 'order_id',
    dataIndex: 'order_id',
    title: i18n.t('Bill.Field.OrderId'),
    render: OrderComponent,
    width: 60,
  },
  {
    key: 'factor',
    dataIndex: 'factor',
    title: i18n.t('Bill.Field.Factor'),
    width: 60,
  },

  {
    key: 'amount',
    dataIndex: 'amount',
    title: i18n.t('Global.Amount'),
    render: CurrencyComponent,
    width: 100,
  },

  {
    key: 'currency',
    dataIndex: 'factor',
    title: i18n.t('Global.Currency'),
    render: CurrencyNameComponent,
    width: 100,
  },
];

function groupBy<T>(arr: T[], operator: (single: T) => string): Record<string, T[]> {
  const result = {};
  arr.forEach((single) => {
    const key = operator(single);
    if (!result[key]) result[key] = [];
    result[key].push(single);
  });

  console.log(result);

  return result;
}
