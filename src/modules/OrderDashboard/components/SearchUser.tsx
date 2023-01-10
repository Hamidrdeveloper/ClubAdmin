import { getUsers } from '@modules/OrderDashboard/services/user.service';
import { Col, Row, Select, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { userAtom } from '../Atom';

const SearchUser: FC = () => {
  const { t } = useTranslation();
  const { Title, Text } = Typography;
  const [userId, setUserId] = useState<any>();
  const [searchText, setSearchText] = useState('');
  const { data: users, isLoading } = useQuery(['dashboard-users', searchText], () => getUsers(searchText));

  const [, setUser] = useAtom(userAtom);
  const userOptions = useMemo(() => {
    return users?.data?.map((user) => {
      return {
        value: JSON.stringify([user?.person?.first_name, user?.id]),
        label: user?.person?.first_name,
      };
    });
  }, [users]);
  // @ts-ignore
  useMemo(() => userId && setUser(users?.data.find((user) => user.id == JSON.parse(userId)[1])), [userId]);
  return (
    <Row>
      <Col span={5}>
        <Title level={5}>{t('OrderDashboard.Buyer')}:</Title>
      </Col>
      <Col span={14}>
        <Select
          showSearch
          onSearch={(value) => setSearchText(value)}
          placeholder="Choose Buyer"
          notFoundContent={isLoading ? <Spin size="small" /> : <Text type="warning">no item !</Text>}
          style={{ width: '100%' }}
          options={userOptions}
          onSelect={(e) => setUserId(e)}
        />
      </Col>
    </Row>
  );
};
export default SearchUser;
