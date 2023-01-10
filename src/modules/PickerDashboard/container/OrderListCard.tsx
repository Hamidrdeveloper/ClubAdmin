import { OrderSalePure } from '@src/modules/Order';
import { weightFormatter } from '@src/shared/utils/engine.service';
import { Card, Checkbox, Space, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SingleOrder from '../components/SingleOrder';

type Props = {
  isChecked: boolean;
  orderSale: OrderSalePure;
  pickItem: { positionId: number; picked: number }[] | undefined;
  onDoneComplete: () => void;
  onOnlineTabletClick: (orderId: number) => void;
  onSelectClick: (checked: boolean, orderId: number) => void;
};
function OrderListCard({
  orderSale,
  pickItem,
  isChecked,
  onSelectClick,
  onDoneComplete,
  onOnlineTabletClick,
}: Props): ReactElement {
  return (
    <Container isMobile={innerWidth < 768}>
      <Card
        title={
          <Title
            item={orderSale}
            isChecked={isChecked}
            onSelectClick={(checked) => onSelectClick(checked, orderSale.id)}
          />
        }
      >
        <SingleOrder
          orderSale={orderSale}
          pickItem={pickItem}
          onDoneComplete={onDoneComplete}
          onOnlineTabletClick={onOnlineTabletClick}
        />
      </Card>
    </Container>
  );
}

const Container = styled.div<{ isMobile: boolean }>`
  margin-top: 8px;

  & .ant-card-body {
    padding: ${(props) => (props.isMobile ? '0' : '32px')};
  }

  & .ant-collapse-content > .ant-collapse-content-box {
    padding: ${(props) => (props.isMobile ? '0 4px' : '16px')};
  }
`;
//
function Title({
  item,
  isChecked,
  onSelectClick,
}: {
  isChecked: boolean;
  item: OrderSalePure;
  onSelectClick: (checked: boolean) => void;
}): ReactElement {
  const { t } = useTranslation();
  return (
    <TitleContainer>
      <Space className="picker-header" direction="horizontal">
        <Checkbox onChange={(event) => onSelectClick(event.target.checked)} checked={isChecked}>
          {t('PickerDashboard.Select')}
        </Checkbox>
        <span>|</span>
        <Typography.Text style={{ fontSize: '2vmax' }}>
          {t('PickerDashboard.OrderId')}: <Link to={`/admin/orders/order-sale/${item.id}`}>{item.id}</Link>
        </Typography.Text>
        <span>|</span>
        <Typography.Text style={{ color: item.orderStatus?.color, fontSize: '2vmax' }}>
          {item.orderStatus?.name ?? t('PickerDashboard.NoName')}
        </Typography.Text>
        <span>|</span>
        <Typography.Text style={{ fontSize: '2vmax' }}>{item.shippingProfile?.name}</Typography.Text>
        <span>|</span>
        <Typography.Text style={{ fontSize: '2vmax' }}>
          {item.orderSalePositions?.filter((pos) => pos.productVariation)?.length ?? 0}
        </Typography.Text>
        <span>|</span>
        <Typography.Text style={{ fontSize: '2vmax' }}>
          {weightFormatter(item?.total_weight_gross)}
        </Typography.Text>
        <span>|</span>
      </Space>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  & .picker-header {
    width: 100%;
    overflow: auto;
  }
`;

export default OrderListCard;
