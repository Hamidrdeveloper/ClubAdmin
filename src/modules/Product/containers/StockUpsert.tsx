import { StockPure } from '@src/modules/Stock/model';
import { dummyReq } from '@src/modules/Stock/services/mock';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Fallback from '../components/Fallback';
import { variationIdAtom } from '../services/variationStore';
import StockModule from '../Stock.module';

const StockUpsert = (): ReactElement => {
  const { product_id: id } = useParams();
  if (!id) return <Fallback />;

  const [variationId] = useAtom(variationIdAtom);

  const { mutate: create, isLoading: createPend } = useMutation(dummyReq);
  const { mutate: recalculate, isLoading: recallPend } = useMutation(dummyReq);
  const { mutate: accept, isLoading: acceptPend } = useMutation(dummyReq);
  const { mutate: reset, isLoading: resetPend } = useMutation(dummyReq);

  const { t } = useTranslation();
  const module = new StockModule();

  return (
    <>
      <ButtonGroups>
        <Button type="primary" block size="large" loading={createPend} onClick={() => create()} disabled>
          {t('Product.Stock.Fields.CreateReorder')}
        </Button>
        <Button
          block
          size="large"
          // commenting next line, it will gray out background when disbale
          // id="recalculate-btn"
          loading={recallPend}
          onClick={() => recalculate()}
          disabled
        >
          {t('Product.Stock.Fields.RecalculateStocks')}
        </Button>
        <Button block size="large" loading={acceptPend} onClick={() => accept()} disabled>
          {t('Product.Stock.Fields.AcceptSuggestion')}
        </Button>
        <Button
          block
          size="large"
          // Comment next line will gray out background when disable
          // id="reset-btn"
          loading={resetPend}
          onClick={() => reset()}
          disabled
        >
          {t('Product.Stock.Fields.ResetQuantity')}
        </Button>
      </ButtonGroups>
      <PageLayout<StockPure> module={module}>
        <PageLayout.Panel>
          <Panel.Header hasSearch hasNew={false} noDescription dontNavigate />

          <Panel.ListView
            module={module}
            dontNavigate
            hasUpdate={false}
            params={variationId ? { productVariationId: variationId } : {}}
          />
        </PageLayout.Panel>
      </PageLayout>
    </>
  );
};

export default StockUpsert;

const ButtonGroups = styled.div`
  display: inline-flex;
  column-gap: 10px;

  padding-top: 16px;

  button {
    min-width: 14rem;
  }

  #recalculate-btn {
    background-color: #009ddc;
    color: white;
  }
  #reset-btn {
    background-color: #4a5161;
    color: white;
  }
`;
