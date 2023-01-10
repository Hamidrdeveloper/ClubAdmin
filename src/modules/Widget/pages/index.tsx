import React from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes } from 'react-router-dom';

import ConfigPage from './Config.page';
import ThemePage from './Theme.page';
import WidgetPage from './Widget.page';

export default function SliderRoutes(): React.ReactElement {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route path={`theme`} element={<ThemePage />} />
      <Route path={`config`} element={<ConfigPage />} />
      <Route path={`landing`} element={<WidgetPage title={t('Widget.Landing')} slug="landing-main-text" />} />
      <Route path={`footer`} element={<WidgetPage title={t('Widget.FooterImages')} slug="footer-images" />} />
      <Route
        path={`slider`}
        element={<WidgetPage title={t('Widget.MainPageSlider')} slug="main-page-slider" />}
      />
      <Route
        path={`category`}
        element={<WidgetPage title={t('Widget.CategoryImages')} slug="categories-information" />}
      />
      <Route
        path={`before-after`}
        element={<WidgetPage title={t('Widget.BeforeAndAfter')} slug="product-description" />}
      />
      <Route
        path={`app-home`}
        element={<WidgetPage title={t('Widget.AppHomePage')} slug="app-home-page-slider" />}
      />
    </Routes>
  );
}
