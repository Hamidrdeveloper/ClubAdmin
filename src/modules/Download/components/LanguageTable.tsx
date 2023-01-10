import i18n from '@src/core/i18n/config';
import { Language } from '@src/modules/Language';
import LanguageModule from '@src/modules/Language/Language.module';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch, Key, ReactElement } from 'react';
export default function LanguageTable(
  setSelectedLanguages: Dispatch<SetStateAction<Language[]>>,
): ReactElement {
  const languageModule = new LanguageModule();

  const GetSelectedRows = (selectedRows: Key[], selectedRowsData: Key[][]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedLanguages((prev) => {
            if (prev) {
              const allSelectedLanguages = [...prev, ...(selectedRowsData as unknown as Language[])];

              const uniqueLanguages = allSelectedLanguages.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueLanguages;
            } else {
              const allSelectedLanguages = [...(selectedRowsData as unknown as Language[])];

              const uniqueLanguages = allSelectedLanguages.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueLanguages;
            }
          });
        }}
        disabled={selectedRows.length === 0}
      >
        {i18n.t('Download.AddSelected')}
      </Button>
    );
  };

  return (
    <PageLayout<Language> module={languageModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} dontNavigate ExtraAction={GetSelectedRows} />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          module={languageModule}
          tableScroll={{ y: 640, x: 1300 }}
          params={{ isActive: true }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
