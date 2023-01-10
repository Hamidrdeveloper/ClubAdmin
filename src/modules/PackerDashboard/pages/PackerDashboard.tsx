import PackerDashboardContainer from '@modules/PackerDashboard/container/MainContainer/PackerDashboardContainer';
import { PackerDashboardContextProvider } from '@modules/PackerDashboard/context/PackerDashboardContext';
import React from 'react';

const PackerDashboard: React.FC = () => {
  return (
    <PackerDashboardContextProvider>
      <PackerDashboardContainer />
    </PackerDashboardContextProvider>
  );
};

export default PackerDashboard;
