import AddressListHeader from '@src/modules/User/components/AddressListHeader';
import { Address } from '@src/modules/User/model/address';
import { setAsInvoice } from '@src/modules/User/services/address.service';
import { PageLayout, Panel } from '@src/shared/components';
import { Button, message } from 'antd';
import { useAtom } from 'jotai';
import React, { Key, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import { AddressModule } from '../../Supplier.module';
import { Supplier } from '../..';
import { userIdAtom } from '../SupplierManage.page';

let defaultListView: 'list' | 'tiles' = 'tiles';

const AddressTab = ({ queryResult }: { queryResult: UseQueryResult<Supplier | undefined> }): ReactElement => {
  const { supplier_id: id } = useParams();
  if (!id) return <Fallback />;
  const [userId] = useAtom(userIdAtom);

  const user = queryResult.data?.people?.user;

  const { t } = useTranslation();

  const SetAsInvoiceBtn = (selectedRows: Key[]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          if (!userId) return;

          setAsInvoice({ userId: +userId, contact_group_id: +selectedRows[0] }).then(() => {
            queryResult.refetch();
            message.success(t('Global.UpdatedSuccessfully', { title: t('User.Address.Title') }));
          });
        }}
        disabled={selectedRows.length !== 1}
      >
        {t`User.Address.SetAsAnInvoiceAddress`}
      </Button>
    );
  };

  const addressModule = new AddressModule(id);

  const onListViewChangeHandler = (view: 'list' | 'tiles') => {
    defaultListView = view;
  };

  return (
    <PageLayout<Address> module={addressModule}>
      <PageLayout.Panel defaultListView={defaultListView} onListViewChange={onListViewChangeHandler}>
        <Panel.Header
          hasNew
          newLink=""
          ExtraAction={userId ? SetAsInvoiceBtn : undefined}
          extraComponent={
            userId
              ? AddressListHeader({
                  userId,
                  isLoading: queryResult.isLoading,
                  invoiceContactGroupId: user?.invoice_contact_group_id,
                })
              : undefined
          }
        />

        <Panel.ListView
          module={addressModule}
          customEntities={{
            getOne: `/contact-groups/$1`,
          }}
          updateLink=""
          greenSelectCondition={(id) => queryResult.data?.people?.user?.invoice_contact_group_id === id}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default AddressTab;
