import i18n from '@src/core/i18n/config';
import CountryModule from '@src/modules/Country/Country.module';
import { Country } from '@src/modules/Country/model/country.entity';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch, Key, ReactElement } from 'react';
export default function CountryTable(
  setSelectedCountries: Dispatch<SetStateAction<Country[]>>,
): ReactElement {
  const countryModule = new CountryModule();

  const GetSelectedRows = (selectedRows: Key[], selectedRowsData: Key[][]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedCountries((prev) => {
            if (prev) {
              const allSelectedCountries = [...prev, ...(selectedRowsData as unknown as Country[])];
              const uniqueCountries = allSelectedCountries.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCountries;
            } else {
              const allSelectedCountries = [...(selectedRowsData as unknown as Country[])];
              const uniqueCountries = allSelectedCountries.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCountries;
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
    <PageLayout<Country> module={countryModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} dontNavigate ExtraAction={GetSelectedRows} />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          module={countryModule}
          tableScroll={{ y: 640, x: 1300 }}
          params={{ isActive: true }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
