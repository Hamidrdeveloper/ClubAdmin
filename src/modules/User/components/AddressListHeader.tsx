import { Loader } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';

import { getMainAddress } from '../services/address.service';
import Fallback from './Fallback';
import Style from './styles/AddressListHead.style';
import { useTranslation } from 'react-i18next';


const AddressListHeader = ({
  isLoading,
  invoiceContactGroupId,
  userId: id,
}: {
  isLoading: boolean;
  invoiceContactGroupId: number | undefined;
  userId: number | undefined;
}): ReactElement => {
  if (!id) return <Fallback />;

  const [mainAddress, setMainAddress] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    if (!invoiceContactGroupId) return;

    getMainAddress({ userId: +id, invoiceContactGroupId: invoiceContactGroupId }).then((result) => {
      setMainAddress(result);
    });
  }, [invoiceContactGroupId]);

  if (isLoading) return <Loader />;

  return (
    <>
      {mainAddress && (
        <Style.MainContainer>
          <strong>  {t('DocumentSettings.InvoiceAddress')}  </strong>
          <div dangerouslySetInnerHTML={{ __html: mainAddress }}></div>
        </Style.MainContainer>
      )}
    </>
  );
};

export default AddressListHeader;
