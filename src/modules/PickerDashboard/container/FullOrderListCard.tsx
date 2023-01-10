import { OrderedListOutlined } from '@ant-design/icons';
import { Env } from '@src/core';
import { OrderSalePure } from '@src/modules/Order';
import { ResponseContext } from '@src/shared/models';
import { weightFormatter } from '@src/shared/utils/engine.service';
import { Button, Card, Checkbox, Space, Typography } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import Orders from '../components/Orders';
import { getOrderSales, pickListGroupInvoiceOrder } from '../service/order.service';

type loading = 'Pick List' | 'None';

//
function FullOrderListCard({
  countryId,
  shippingProfileId,
}: {
  countryId?: number;
  shippingProfileId?: number;
}): ReactElement {
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState<loading>('None');
  const [isPendding, setIsPending] = useState<boolean>(false);
  const [orderSales, setOrderSales] = useState<ResponseContext<OrderSalePure[]>>();
  const [pagination, setPagination] = useState<{ page: number; per_page: number }>({
    page: 1,
    per_page: 10,
  });

  const orderSalesData = orderSales?.data ?? [];

  useEffect(() => {
    if (pagination) {
      getOrders();
    }
  }, [pagination]);

  const getOrders = () => {
    setIsPending(true);
    getOrderSales({
      page: pagination.page,
      per_page: pagination.per_page,
      countryId: countryId === -1 ? undefined : countryId,
      shippingProfileId: shippingProfileId === -1 ? undefined : shippingProfileId,
    }).then((data) => {
      setOrderSales(data);
      setIsPending(false);
    });
  };

  const onPaginate = (data: { page: number; per_page: number }) => {
    setPagination({ page: data.page ?? 1, per_page: data.per_page ?? 10 });
  };

  const onDoneComplete = () => {
    getOrders();
  };

  return (
    <Container isMobile={innerWidth < 768}>
      <Card
        title={
          <Title
            isLoading={loading}
            onPickListClick={() => {
              setLoading('Pick List');
              pickListGroupInvoiceOrder(selected)
                .then((link) => {
                  setSelected([]);
                  window.open(Env.PURE_URL + link);
                })
                .finally(() => setLoading('None'));
            }}
            indeterminate={selected.length > 0 && selected.length < orderSalesData.length}
            isSelected={orderSalesData.length !== 0 && orderSalesData.length === selected.length}
            onSelectAllClick={(isSelected) =>
              setSelected(isSelected ? orderSalesData.map((order) => order.id) : [])
            }
            totalWeight={
              orderSalesData
                .filter((pos) => selected.find((sel) => sel === pos.id))
                .map((pos) => pos.orderSalePositions)
                .map((pos) => ({
                  weight: pos
                    .map((pos) => ({
                      weight: Number(pos.weight_gross ?? 0) * Number(pos.quantity ?? 0),
                    }))
                    .reduce((a, b) => a + b.weight, 0),
                }))
                .reduce((a, b) => a + b.weight, 0) ?? 0
            }
          />
        }
      >
        <Orders
          data={orderSales}
          selected={selected}
          isLoading={isPendding}
          setPagination={onPaginate}
          onSelectClick={setSelected}
          onDoneComplete={onDoneComplete}
        />
      </Card>
    </Container>
  );
}

const Container = styled.div<{ isMobile: boolean }>`
  & .ant-card-body {
    padding: 0;
  }
`;

//
function Title({
  totalWeight,
  isSelected,
  isLoading,
  indeterminate,
  onSelectAllClick,
  onPickListClick,
}: {
  totalWeight: number;
  isLoading: 'Pick List' | 'None';
  isSelected: boolean;
  indeterminate: boolean;
  onSelectAllClick: (isSelected: boolean) => void;
  onPickListClick: () => void;
}): ReactElement {
  const { t } = useTranslation();
  return (
    <TitleContainer>
      <Space className="picker-header" direction="horizontal">
        <Checkbox
          onChange={(event) => onSelectAllClick(event.target.checked)}
          checked={isSelected}
          indeterminate={indeterminate}
        >
          {t('PickerDashboard.SelectAll')}
        </Checkbox>
        <span>|</span>
        <Typography.Text style={{ fontSize: '2vmax' }}> {t('PickerDashboard.TotalWeight')}:</Typography.Text>
        <Typography.Text style={{ fontSize: '2vmax' }}>{weightFormatter(totalWeight)}</Typography.Text>
        <span>|</span>

        <Space dir="horizontal">
          <span>| {t('PickerDashboard.GroupFunction')}: </span>
          <Button
            size="large"
            onClick={onPickListClick}
            icon={<OrderedListOutlined />}
            loading={isLoading === 'Pick List'}
            disabled={!indeterminate && !isSelected}
          >
            {t('PickerDashboard.PickList')}
          </Button>
        </Space>
      </Space>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  & .picker-header {
    width: 100%;
    overflow: auto;

    & .ant-space-item:last-child {
      margin-left: auto;
    }
  }
`;

export default FullOrderListCard;
