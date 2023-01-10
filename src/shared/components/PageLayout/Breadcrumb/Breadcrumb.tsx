import { HomeFilled } from '@ant-design/icons';
import { FactoryModule } from '@src/shared/models';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import Styles from './Breadcrumb.style';

const Breadcrumb: React.FC<{ module?: FactoryModule<unknown>; routes?: Route[] }> = ({ module, routes }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const brdRoutes = routes ? routes : module?.breadcrumbItems;

  return (
    <Styles.MainContainer>
      <div className="breadcrumb">
        <Link to="/admin/dashboard">
          <span className="breadcrumb__inner">
            <HomeFilled style={{ fontSize: 16, marginRight: 4 }} />
            <span className="breadcrumb__title">{t('Global.Home')}</span>
          </span>
        </Link>

        {(brdRoutes || []).map((brd, index) =>
          index === 0 ? (
            <a onClick={() => navigate(-1)} key={`breadcrumb-${index}`}>
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">{brd.breadcrumbName}</span>
              </span>
            </a>
          ) : (
            <Link to={brd.path} key={`breadcrumb-${index}`}>
              <span className="breadcrumb__inner">
                <span className="breadcrumb__title">{brd.breadcrumbName}</span>
              </span>
            </Link>
          ),
        )}
      </div>
    </Styles.MainContainer>
  );
};

export default Breadcrumb;
