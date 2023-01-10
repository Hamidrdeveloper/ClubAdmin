import { CloseCircleOutlined } from '@ant-design/icons';
import { Loader } from '@src/shared/components';
import { Button, Result, Typography } from 'antd';
import React, { ReactElement, Suspense, useContext, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { AuthContext } from '../Authentication';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import Sidebar from './Sidebar/Sidebar';
import Styles from './SiteLayout.style';

const { Paragraph, Text } = Typography;

function ErrorFallback({ error, resetErrorBoundary, errorStack }) {
  return (
    <Styles.ErrorContainer>
      <Result
        status="error"
        title="Something went wrong"
        subTitle="Sorry, the page you visited has encountered an error."
        extra={[
          <Button type="primary" key="console" onClick={resetErrorBoundary}>
            Try Again
          </Button>,
        ]}
      >
        <div className="desc">
          <Paragraph>
            <Text strong style={{ fontSize: 16 }}>
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="error-icon" /> {error.message}
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="error-icon" /> {error.stack}
          </Paragraph>
          <Paragraph>
            <CloseCircleOutlined className="error-icon" /> {errorStack}
          </Paragraph>
        </div>
      </Result>
    </Styles.ErrorContainer>
  );
}

export default function SiteLayout({ children }: { children: ReactElement }): ReactElement {
  const [collapsed, setCollapsed] = useState(true);
  const [errorStack, setErrorStack] = useState<string>();
  const { loggedInUserRole } = useContext(AuthContext);

  const toggleCollapsed = () => setCollapsed((prev: boolean) => !prev);

  const onHandleError = (error: Error, info: { componentStack: string }) => {
    console.log(error);
    setErrorStack(info.componentStack);
  };

  return (
    <Styles.MainContainer>
      <Styles.AppContainer isPartner={loggedInUserRole === 'partner'} collapsed={collapsed}>
        <Header />
        <ErrorBoundary
          onError={onHandleError}
          FallbackComponent={(data) => ErrorFallback({ ...data, errorStack })}
        >
          <Suspense fallback={<Loader />}>
            <div className="contents-container">
              <div className="content-body">{children}</div>
            </div>
          </Suspense>
        </ErrorBoundary>
      </Styles.AppContainer>

      {loggedInUserRole !== 'partner' && <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />}

      <Footer />
    </Styles.MainContainer>
  );
}
