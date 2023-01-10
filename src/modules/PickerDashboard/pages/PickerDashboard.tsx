import { Country } from '@src/modules/Country';
import { ShippingProfile } from '@src/modules/ShippingProfile';
import { Col, Row, Tabs } from 'antd';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AutoLoader from '../components/AutoLoader';
import TabMaker from '../components/TabMaker';
import FullOrderListCard from '../container/FullOrderListCard';
import { getAllCountries } from '../service/country.service';
import { getAllShippings } from '../service/shipping.service';

const PickerDashboard: React.FC = () => {
  const [getCountries, setCountries] = useState<AutoState<Country[]>>(null);
  const [getShippings, setShippings] = useState<AutoState<ShippingProfile[]>>(null);
  const { t } = useTranslation();
  const isMobile = innerWidth < 768;

  return (
    <Row
      gutter={[32, 32]}
      style={{
        background: 'white',
        borderRadius: '16px',
        padding: isMobile ? '16px 0' : '32px',
      }}
    >
      <Col
        span={24}
        style={{ paddingLeft: isMobile ? '4px' : '16px', paddingRight: isMobile ? '4px' : '16px' }}
      >
        <Tabs type="card">
          <Tabs.TabPane tab={t('PickerDashboard.Country')} key="country">
            <AutoLoader data={[getCountries, setCountries]} service={getAllCountries}>
              <Col
                span={24}
                style={{ paddingLeft: isMobile ? '4px' : '16px', paddingRight: isMobile ? '4px' : '16px' }}
              >
                <TabMaker
                  sendKey="countryId"
                  data={(getCountries ?? []).map(({ id, name }) => ({ id, title: name }))}
                >
                  <FullOrderListCard />
                </TabMaker>
              </Col>
            </AutoLoader>
          </Tabs.TabPane>

          <Tabs.TabPane tab={t('PickerDashboard.ShippingProfile')} key="shipping">
            <AutoLoader data={[getShippings, setShippings]} service={getAllShippings}>
              <Col span={24}>
                <TabMaker
                  sendKey="shippingProfileId"
                  data={(getShippings ?? []).map(({ id, name }) => ({ id, title: name }))}
                >
                  <FullOrderListCard />
                </TabMaker>
              </Col>
            </AutoLoader>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default PickerDashboard;

export type AutoState<T> = T | null | undefined;
