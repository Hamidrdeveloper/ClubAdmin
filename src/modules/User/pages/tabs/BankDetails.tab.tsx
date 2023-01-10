import { Loader } from '@src/shared/components';
import React, { ReactElement, useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import BankDetailsUpsert from '../../containers/BankDetailsUpsert';
import { BankDetailPure } from '../../model/bankDetails';
import { getBankDetails } from '../../services/bankdetail.service';

const BankDetailsTab = (): ReactElement => {
  const { user_id: id } = useParams();
  if (!id) return <Fallback />;

  const [singleData, setSingleData] = useState({} as BankDetailPure);
  const [isPending, setPending] = useState<boolean>(true);

  useEffect(() => {
    getBankDetails({ userId: +id })
      .then((data: BankDetailPure | number) => {
        setPending(false);
        if (typeof data === 'number') return;

        setSingleData(data);
      })
      .catch(() => {
        setPending(false);
      });
  }, []);

  return <>{isPending ? <Loader /> : <BankDetailsUpsert singleData={singleData} userId={id} />}</>;
};

export default BankDetailsTab;
