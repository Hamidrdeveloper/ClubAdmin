/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import { ShippingProfile } from '../model/shippingProfile.entity';
import ShippingProfileModule from '../ShippingProfile.module';
import axios, { AxiosResponse } from 'axios';
import { Login } from '@src/core/Authentication/model';

export default function ShippingProfilePage(): ReactElement {
  const shippingProfileModule = new ShippingProfileModule();
  
  
  return (
    <PageLayout<ShippingProfile> module={shippingProfileModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew />

        <Panel.ListView
       
          module={shippingProfileModule}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
