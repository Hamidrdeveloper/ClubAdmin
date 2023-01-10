import '@styles/antd.less';
import '@styles/styles.scss';
import '@src/shared/utils/axios.service';

import { App } from '@src/App';
import React from 'react';
import ReactDom from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AuthProvider } from './core';

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0, refetchIntervalInBackground: false, refetchOnWindowFocus: false } },
});

ReactDom.render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </QueryClientProvider>,
  document.getElementById('root'),
);
