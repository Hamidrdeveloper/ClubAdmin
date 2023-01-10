import BankDetailsUpsert from '@src/modules/User/containers/BankDetailsUpsert';
import { BankDetailPure } from '@src/modules/User/model/bankDetails';
import { getBankDetails } from '@src/modules/User/services/bankdetail.service';
import { Loader } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';

import Fallback from '../../components/Fallback';
import { userIdAtom } from '../SupplierManage.page';

const BankDetailsTab = (): ReactElement => {
  const [userId] = useAtom(userIdAtom);
  if (!userId) return <Fallback />;

  const [singleData, setSingleData] = useState({} as BankDetailPure);
  const [isPending, setPending] = useState<boolean>(true);

  useEffect(() => {
    if (!userId) return;

    getBankDetails({ userId: +userId })
      .then((data: BankDetailPure | number) => {
        setPending(false);
        if (typeof data === 'number') return;

        setSingleData(data);
      })
      .catch(() => {
        setPending(false);
      });
  }, []);

  return <>{isPending ? <Loader /> : <BankDetailsUpsert singleData={singleData} userId={userId} />}</>;
};

export default BankDetailsTab;
