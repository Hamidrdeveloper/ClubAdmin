import { FactoryModule } from '@src/shared/models';
import React, { ReactElement, ReactNode, lazy } from 'react';

function PageLayout<T>({
  children,
  module,
}: {
  children: ReactNode;
  module: FactoryModule<T>;
}): ReactElement {
  const PageLayoutContext = React.createContext<
    { children: ReactNode; module: FactoryModule<T> } | undefined
  >(undefined);

  return (
    <PageLayoutContext.Provider value={{ children, module }}>
      {React.Children.toArray(children).map((child: ReactElement) => React.cloneElement(child, { module }))}
    </PageLayoutContext.Provider>
  );
}

PageLayout.Panel = lazy(() => import('./PageLayoutPanel'));
PageLayout.Breadcrumb = lazy(() => import('./Breadcrumb/Breadcrumb'));

export default PageLayout;
