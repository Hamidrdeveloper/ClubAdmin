import { OrderSalePure } from '@modules/Order';
import { AuthContext } from '@src/core';
import { PageLayout, Panel } from '@src/shared/components';
import { ApiBuilder } from '@src/shared/utils';
import React, { ReactElement, useContext, useState } from 'react';

import OrderSaleGroupFunctionModal from '../../components/OrderSaleGroupFunctionModal';
import OrderModule from '../../Order.module';

export default function OrderPage(): ReactElement {
  const module = new OrderModule();
  const { role } = useContext(AuthContext);
  const [groupFunctionIds, setGroupFunctionIds] = useState<number[]>([]);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <>
      <PageLayout<OrderSalePure> module={module}>
        <PageLayout.Breadcrumb />

        <PageLayout.Panel>
          <Panel.Header
            onGroup={(data: number[]) => {
              setGroupFunctionIds(data);
              setModalVisible(true);
            }}
            hasSearch
            hasNew={role !== 'partner'}
            newLink=""
            noListView
          />

          <Panel.ListView
            module={module}
            updateLink={module.breadcrumbItems[0].path}
            tableScroll={{ x: 1450, y: 750 }}
            params={{ orderBy: { id: 'DESC' } }}
            customEntities={{ getAll: new ApiBuilder<OrderSalePure>('/order-sales/list', module.title[0]) }}
          />
        </PageLayout.Panel>
      </PageLayout>
      {isModalVisible && (
        <OrderSaleGroupFunctionModal
          groupFunctionIds={groupFunctionIds}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
}
