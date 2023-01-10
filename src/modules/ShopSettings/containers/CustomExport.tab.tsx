import { OrderStatus } from '@src/modules/Order';
import { User } from '@src/modules/User';
import { Loader } from '@src/shared/components';
import { message } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomExportForm } from '../components/CustomExport.form';
import { exportCustomDocument, getOrderStatuses, getUser } from '../services/exportCustom.service';
import Styles from './styles/SocialMedia.style';

type Props = { settings: { order_user_id: number | null; order_status_id: number | null } };
const CustomExport = ({ settings: { order_user_id, order_status_id } }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [initialData, setinitialData] = useState<{ user: User; order_status: OrderStatus }>(
    {} as { user: User; order_status: OrderStatus },
  );
  const [loading, setloading] = useState<boolean>(false);
  const { t } = useTranslation();
  useEffect(() => {
    setloading(true);
    getUser(order_user_id).then((userResponse) => {
      getOrderStatuses()
        .then((statusResponse) => {
          const filteredOrderStatus = statusResponse?.filter((item) => {
            return item.id == order_status_id;
          });
          setinitialData({ user: userResponse?.data?.data, order_status: filteredOrderStatus[0] });
          setloading(false);
        })
        .catch((er) => {
          console.log(er);
        });
    });
  }, []);

  const handleFormSubmit = (data: { user: User; order_status: OrderStatus }) => {
    setPending(true);

    exportCustomDocument(data?.user?.id, data?.order_status?.id)
      .then((res) => {
        console.log(res);
        setPending(false);
        message.success(t('ShopSettings.Tab.CustomExportUpdated'));
      })
      .catch((er) => {
        console.log(er);
      });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <Styles.MainContainer>
        <CustomExportForm initialValues={initialData} onSubmit={handleFormSubmit} isPending={pending} />
      </Styles.MainContainer>
    );
  }
};

export default CustomExport;
