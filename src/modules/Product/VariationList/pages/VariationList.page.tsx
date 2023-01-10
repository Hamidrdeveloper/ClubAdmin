import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { ReactElement, useState } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Variation } from '../model/variationList.entity';
import VariationListModule from '../VariationList.module';
import AutoGenerateModal from './AutoGenerateModal';

export default function VariationList({
  onNew,
  onUpdate,
  productId,
}: {
  onNew?: () => void;
  productId: number | null;
  onUpdate?: (id: number) => void;
}): ReactElement {
  const [isVisible, setVisible] = useState(false);
  const variationModule = new VariationListModule(productId);
  const { t } = useTranslation();
  return (
    <PageLayout<Variation> module={variationModule}>
      <PageLayout.Panel>
        <Panel.Header
          hasNew
          hasSearch
          onNew={onNew}
          ExtraAction={() => (
            <Button type="primary" onClick={() => setVisible(true)}>
              {t('Product.Variation.AutoGenerateVariation')}
            </Button>
          )}
        />

        <Panel.ListView
          hasActive
          hasUpdate={false}
          onUpdate={onUpdate}
          module={variationModule}
          tableScroll={{ x: 1320, y: 700 }}
        />
      </PageLayout.Panel>

      <AutoGenerateModal setVisible={setVisible} isVisible={isVisible} />
    </PageLayout>
  );
}
