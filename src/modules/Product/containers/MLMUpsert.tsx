/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PlusCircleOutlined } from '@ant-design/icons';
import { Loader } from '@src/shared/components';
import { GlobalMutationProps } from '@src/shared/models';
import { Button, Col, Row, Typography, message } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import Fallback from '../components/Fallback';
import VariationMLMForm from '../components/VariationMLMForm';
import { VariationMLM, VariationMLMFormCtx } from '../model/VariationMLM.entity';
import { getVariationMLM, removeVariationMLMOption, variationMLMApi } from '../services/mlm.service';
import { variationIdAtom } from '../services/variationStore';

const MLMUpsert: FC = () => {
  const { t } = useTranslation();
  const [variationId] = useAtom(variationIdAtom);
  if (!variationId) return <Fallback />;

  const [optionsData, setOptionsData] = useState([] as VariationMLM[]);
  const [getterLoading, setGetterLoading] = useState(true);
  const [pending, setPending] = useState<number>(-2);

  const { mutate } = useMutation(({ id, values }: GlobalMutationProps<VariationMLMFormCtx>) => {
    return id ? variationMLMApi.updateOne(id, values) : variationMLMApi.createOne(values);
  });

  const { mutate: removeOption } = useMutation(({ id }: { id: number }) => removeVariationMLMOption(id));

  useEffect(() => {
    setGetterLoading(true);
    getVariationMLM(variationId)
      .then((resp: VariationMLM[]) => {
        setGetterLoading(false);
        setOptionsData(resp);
      })
      .catch(() => {
        setGetterLoading(false);
      });
  }, []);

  const handleSubmit = (id: number, formValues: Partial<VariationMLM>) => {
    setPending(id);
    const { country, ...restValues } = formValues;

    const values: Partial<VariationMLMFormCtx> = {
      product_variation_id: variationId,
      country_id: country?.id,
      ...restValues,
    };

    mutate(
      { id: id === -1 ? undefined : id, values },
      {
        onSuccess: (data: VariationMLM) => {
          if (id !== -1) return;

          setOptionsData((prev) => prev.map((option) => (option.id === -1 ? data : option)));
        },
        onSettled: () => {
          setPending(-2);
        },
      },
    );
  };

  const onOptionCreate = () => {
    if (!optionsData?.some((option) => option.id === -1)) {
      setOptionsData((prev) => [
        {
          id: -1,
          qv: undefined,
          country: null,
          is_active: false,
          provision_price: undefined,
          percentage_of_provision: undefined,
        } as VariationMLM,
        ...prev,
      ]);
    }
  };

  const onOptionRemove = (id: number) => {
    setOptionsData((prev) => prev.filter((option) => option.id !== id));

    if (id !== -1) {
      // TODO: Loading For Remove Btn

      removeOption(
        { id },
        {
          onSuccess: () => {
            message.success(t('Global.DeletedSuccessfully', { title: t('Product.Variation.MLM.MLMDetail') }));
          },
          onError: () => {
            message.error(t('Global.DeletedError', { title: t('Product.Variation.MLM.MLMDetail') }));
          },
        },
      );
    }
  };

  return (
    <MainContainer>
      <Row className="header" justify="space-between">
        <Col>
          <Typography.Title level={4}>{t('Product.Variation.MLM.MLMList')}</Typography.Title>
        </Col>

        <Col>
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={onOptionCreate}>
            {t('Global.Create')}
          </Button>
        </Col>
      </Row>

      {getterLoading ? (
        <Loader />
      ) : (
        <>
          {optionsData.map((option, index) => (
            <VariationMLMForm
              initialValues={option}
              key={`mlm-${index}`}
              isPending={pending === option.id}
              onRemove={() => onOptionRemove(option?.id)}
              onSubmit={(values) => handleSubmit(option?.id, values)}
            />
          ))}
        </>
      )}
    </MainContainer>
  );
};

export default MLMUpsert;

const MainContainer = styled.div`
  & .header {
    padding: 16px 0;

    & button {
      min-width: 180px;
    }
  }
`;
