import { PageLayout, Panel } from '@src/shared/components';
import { Button, message } from 'antd';
import React, { ReactElement } from 'react';
import { Key } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

import AddressListHeader from '../../components/AddressListHeader';
import Fallback from '../../components/Fallback';
import { Address } from '../../model/address';
import { setAsInvoice } from '../../services/address.service';
import { AddressModule } from '../../User.module';
import { User } from '../..';

const AddressTab = ({ queryResult }: { queryResult: UseQueryResult<User | undefined> }): ReactElement => {
  const { user_id: id } = useParams();

  if (!id) return <Fallback />;

  const { t } = useTranslation();

  const SetAsInvoiceBtn = (selectedRows: Key[]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setAsInvoice({ userId: +id, contact_group_id: +selectedRows[0] }).then(() => {
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

  const addressModule = new AddressModule(+id);

  return (
    <PageLayout<Address> module={addressModule}>
      <PageLayout.Panel defaultListView="tiles">
        <Panel.Header
          hasNew
          newLink=""
          ExtraAction={SetAsInvoiceBtn}
          extraComponent={AddressListHeader({
            isLoading: queryResult.isLoading,
            userId: +id,
            invoiceContactGroupId: queryResult.data?.invoice_contact_group_id,
          })}
        />

        <Panel.ListView
          dontNavigate
          module={addressModule}
          updateLink=""
          greenSelectCondition={(id) => queryResult.data?.invoice_contact_group_id === id}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default AddressTab;
