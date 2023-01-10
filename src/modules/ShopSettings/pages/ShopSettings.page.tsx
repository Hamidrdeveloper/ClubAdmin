import { Loader, PageLayout } from '@src/shared/components';
import { Tabs } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';

import { getAnalyticTagsSetting } from '../controllers/analyticTags.controller';
import { getSaleSystemSetting } from '../controllers/saleSystem.controller';
import { getSocialMediaSetting } from '../controllers/socialMedia.controller';
import { AnalyticTagsModel } from '../model/analyticTags.entity';
import { PartnerModel } from '../model/partner.entity';
import { SaleSystemModel } from '../model/saleSystem.entity';
import { SocialMediaModel } from '../model/socialMedia.entity';
import { getCustomDocument } from '../services/exportCustom.service';
import ShopSettingsModule from '../ShopSettings.module';
import Styles from './styles/ShopSettings.style';

const { TabPane } = Tabs;

export default function ShopSettingsPage(): ReactElement {
  const shopSettingsModule = new ShopSettingsModule();

  const [pend, setPend] = useState<number>(0);
  const [analyticTagsSettings, setAnalyticTagsSettings] = useState<AnalyticTagsModel[]>([]);
  const [partnerSettings] = useState<PartnerModel | null>(null);
  const [saleSystemSettings, setSaleSystemSetting] = useState<SaleSystemModel | null>(null);
  const [socialMediaSettings, setSocialMediaSettings] = useState<SocialMediaModel[]>([]);
  const [exportCustomSettings, setExportCustomSettings] = useState<{
    order_user_id: number | null;
    order_status_id: number | null;
  }>({ order_user_id: null, order_status_id: null });

  const maxLoading = 3;

  const isPending = () => pend < maxLoading;

  useEffect(() => {
    getSaleSystemSetting().then((settings) => {
      setSaleSystemSetting(settings);
      setPend((pend) => pend + 1);
    });

    // getPartnerSetting().then((settings) => {
    //   setPartnerSetting(settings);
    //   setPend((pend) => pend + 1);
    // });

    getAnalyticTagsSetting().then((settings) => {
      setAnalyticTagsSettings(settings || []);
      setPend((pend) => pend + 1);
    });

    getSocialMediaSetting().then((settings) => {
      setSocialMediaSettings(settings || []);
      setPend((pend) => pend + 1);
    });

    getCustomDocument()
      .then((res) => {
        setExportCustomSettings(res.data?.data);
        setPend((pend) => pend + 1);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const tabsFactory = (): JSX.Element[] => {
    return shopSettingsModule.Tabs.map((tab, index) => {
      if (isPending()) {
        return (
          <TabPane tab={tab.title} key={(index + 1).toString()} disabled={!tab.children}>
            <Loader />
          </TabPane>
        );
      } else {
        return (
          <TabPane tab={tab.title} key={(index + 1).toString()} disabled={!tab.children}>
            {tab.children &&
              tab.children({
                analyticTagsSettings,
                partnerSettings,
                saleSystemSettings,
                socialMediaSettings,
                exportCustomSettings,
              })}
          </TabPane>
        );
      }
    });
  };

  return (
    <PageLayout<unknown> module={shopSettingsModule}>
      <PageLayout.Breadcrumb />

      <Styles.MainContainer>
        <Styles.TabsContainer>
          <Tabs className="shop-tabs" defaultActiveKey="1" type="card">
            {tabsFactory()}
          </Tabs>
        </Styles.TabsContainer>
      </Styles.MainContainer>
    </PageLayout>
  );
}
