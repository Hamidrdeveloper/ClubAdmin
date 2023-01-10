import { Loader } from '@src/shared/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SettingUpsert from '../../containers/SettingUpsert';
import { Stock } from '../../model';
import StockModule from '../../Stock.module';

const SettingTab = (): ReactElement => {
  const { stock_id: id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({} as Stock);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      const module = new StockModule();
      module.apiService
        .getOne(+id)
        .then((resp) => {
          setLoading(false);
          setData(resp);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, []);

  const callbackHandler = (data) => {
    // to update id in singleData (create and save button titles differ)
    setData(data);
    if (id) return;

    navigate(`${data.id}`);
  };

  return <>{isLoading ? <Loader /> : <SettingUpsert onCallback={callbackHandler} singleData={data} />}</>;
};

export default SettingTab;
