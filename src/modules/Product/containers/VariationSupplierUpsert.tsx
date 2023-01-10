/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { PlusCircleOutlined } from '@ant-design/icons';
import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { Button, Col, Row, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import Fallback from '../components/Fallback';
import VariationSuppliersForm from '../components/VariationSuppliersForm';
import { VariationSupplier, VariationSupplierCtx } from '../model/VariationSupplier.entity';
import { deleteSingleVariationSupplier, getVariationSupplier } from '../services/supplier.service';
import { variationIdAtom } from '../services/variationStore';

const apiService = new ApiBuilder('product-variation-suppliers', i18n.t('Product.Variation.Suppliers.Title'));

const VariationSupplierUpsert: FC<GlobalUpsertProps<VariationSupplier[]>> = ({ singleData: _singleData }) => {
  const [variationId] = useAtom(variationIdAtom);
  if (!variationId) return <Fallback />;

  const { t } = useTranslation();

  const [singleData, setSingleData] = useState(_singleData ?? ([] as VariationSupplier[]));
  const [isLoading, setLoading] = useState(false);
  const [pending, setPending] = useState<number>(-2);

  const { mutate } = useMutation(({ id, values }: GlobalMutationProps<Partial<VariationSupplierCtx>>) => {
    return id ? apiService.updateOne(id, values) : apiService.createOne(values);
  });

  const { mutate: remove } = useMutation(deleteSingleVariationSupplier);

  useEffect(() => {
    setLoading(true);
    getVariationSupplier(variationId)
      .then((resp: VariationSupplier[]) => {
        setLoading(false);
        setSingleData(resp);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleFormSubmit = (id: number, formValues: Partial<VariationSupplier>) => {
    setPending(id);

    const { supplier, currency, unit, supplier_product_number, ...restValues } = formValues;

    const finalValues: Partial<VariationSupplierCtx> = {
      unit_id: unit?.id,
      currency_id: currency?.id,
      supplier_id: supplier?.id,
      product_variation_id: variationId,
      supplier_product_number: String(supplier_product_number),

      ...restValues,
    };

    mutate(
      { id: id === -1 ? undefined : id, values: finalValues },
      {
        onSuccess: (data: VariationSupplier) => {
          // on success, (edited a variation supplier) dont do anything.
          if (id !== -1) return;

          // if created a new variation supplier, merge it to the list - replace its id with the real data
          setSingleData((prev) => prev.map((option) => (option.id === -1 ? data : option)));
        },
        onSettled: () => {
          setPending(-2);
        },
      },
    );
  };

  const onOptionCreate = () => {
    if (!singleData?.some((option) => option.id === -1)) {
      setSingleData((prev) => [
        {
          id: -1,
          supplier_product_number: '',
          supplier_product_name: '',
          price_value: undefined,
          delivery_days: undefined,
          minimum_quantity: undefined,
          supplier: null,
          unit: null,
        } as VariationSupplier,
        ...prev,
      ]);
    }
  };

  const onOptionRemove = (id: number) => {
    setSingleData((prev) => prev.filter((option) => option.id !== id));

    if (id !== -1) {
      remove(id);
    }
  };

  return (
    <MainContainer>
      <Row className="header" justify="space-between">
        <Col>
          <Typography.Title level={4}>
            {t('Product.Variation.Suppliers.VariationSuppliersList')}
          </Typography.Title>
        </Col>

        <Col>
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={onOptionCreate}>
            {t('Global.Create')}
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {singleData?.map((option, index) => (
            <VariationSuppliersForm
              initialValues={option}
              key={`supplier-${index}`}
              isPending={pending === option.id}
              onRemove={() => onOptionRemove(option.id)}
              onSubmit={(values) => handleFormSubmit(option?.id, values)}
            />
          ))}
        </>
      )}
    </MainContainer>
  );
};

export default VariationSupplierUpsert;

const MainContainer = styled.div`
  & .header {
    padding: 16px 0;

    & button {
      min-width: 180px;
    }
  }
`;
