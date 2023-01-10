import { AimOutlined } from '@ant-design/icons';
import { Env } from '@src/core';
import { User } from '@src/modules/User';
import { Loader, ModalHeader } from '@src/shared/components';
import { intlDate } from '@src/shared/utils/engine.service';
import { Avatar, Col, Row, Space, Tabs, Typography } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import PartnerUserInfo from '../components/PartnerUserInfo';
import PartnerModule from '../Partner.module';
import { getPartnerUserInfo } from '../service/partner.service';

const { TabPane } = Tabs;

type Props = { userId: number; isVisible: boolean; setVisible: (status: boolean) => void };
const PartnerModal: React.FC<Props> = ({ userId, isVisible, setVisible }) => {
  const partnerModule = new PartnerModule();
  const [isPending, setPending] = useState(true);
  const [user, setUser] = useState<User>({} as User);

  useEffect(() => {
    if (userId) {
      setPending(true);
      getPartnerUserInfo(userId).then((data) => {
        setUser(data);

        setPending(false);
      });
    }
  }, [userId]);

  const handleCloseModal = () => {
    setPending(true);
    setUser({} as User);
    setVisible(!isVisible);
  };
  const { t } = useTranslation();

  return (
    <Modal
      width={750}
      footer={false}
      destroyOnClose
      closable={false}
      visible={isVisible}
      onCancel={handleCloseModal}
      title={
        <ModalHeader
          onClose={handleCloseModal}
          items={[
            ...(partnerModule.breadcrumbItems || []),
            { path: '', breadcrumbName: partnerModule.title[0] },
          ]}
        />
      }
    >
      <MainContainer>
        {isPending && Object.keys(user).length === 0 ? (
          <Loader />
        ) : (
          <>
            <Row className="avatar">
              <Col span={24}>
                <Avatar
                  className="avatar-img"
                  src={user.avatar ? Env.PURE_URL + user.avatar : '/assets/images/global/avatar.png'}
                />
              </Col>
            </Row>

            <Row className="title">
              <Col span={24}>
                <Typography.Title style={{ margin: 0 }} level={4}>
                  {user.person.full_name}
                </Typography.Title>
              </Col>
              <Col span={24}>
                <Typography.Text className="location">
                  <AimOutlined />
                  &nbsp;
                  <span>
                    {user.country?.name ?? ' - '} , {user.language.title}
                  </span>
                </Typography.Text>
              </Col>
            </Row>

            <Row className="info" justify="space-between">
              {user.partner && (
                <Col>
                  <Space size="large">
                    <Typography.Title level={5}>
                      Sponsor : <span>{user.partner.sponsors_count}</span>
                    </Typography.Title>
                    <Typography.Title level={5}>
                      Partner : <span>{user.partner.partners_count}</span>
                    </Typography.Title>
                    {/* hide coach as requested in #5480 */}
                    {/* <Typography.Title level={5}>
                      Coach : <span>{user.partner.coachs_count}</span>
                    </Typography.Title> */}
                  </Space>
                </Col>
              )}
              <Col>
                <Typography.Text className="join-date">
                  {t('User.Field.JoinedToCleafinOn')}
                  {intlDate(new Date(user.created_at))}
                </Typography.Text>
              </Col>
            </Row>

            <Row className="tabs">
              <Col span={24}>
                <Tabs defaultActiveKey="1">
                  <TabPane tab={t('User.PersonalInfo.Title')} key="1">
                    <PartnerUserInfo user={user} />
                  </TabPane>
                  {/* Removing ContactGroup Section cause the backend won't send us this */}
                  {/* {user.person.contactGroup && (
                    <TabPane tab="Contact Groups" key="2">
                      <PartnerContactInfo user={user} />
                    </TabPane>
                  )} */}
                </Tabs>
              </Col>
            </Row>
          </>
        )}
      </MainContainer>
    </Modal>
  );
};

export default PartnerModal;

const MainContainer = styled.div`
  & .avatar {
    & .avatar-img {
      width: 80px;
      height: 80px;
      border: 1px solid #d9d9d9;
    }
  }

  & .title {
    margin: 16px 0;

    & .location {
      margin-top: 4px;
      color: ${(props) => props.theme.colors.main};
    }
  }

  & .info {
    & .join-date {
      color: #009ddc;
    }

    & h5 {
      color: #9d9d9d;

      & span {
        color: #4a5161;
      }
    }
  }

  & .tabs {
    margin-top: 24px;
  }
`;
