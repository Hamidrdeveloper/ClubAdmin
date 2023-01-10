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
import { PlusCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import Fallback from '@src/modules/Supplier/components/Fallback';
import { GlobalMutationProps } from '@src/shared/models';
import { ApiBuilder, normalizeTranslate } from '@src/shared/utils';
import { Button, Col, Row, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import AttributeOptionsForm from '../components/AttributeTypeOptionsForm';
import { AttributeOptionsFormCtx } from '../model/attributeOptions-args.entity';
import { AT_Options } from '../model/attributeOptions.entity';
import { deleteSingleOption } from '../services/attributeOptions.service';

interface Props {
  singleData: AT_Options[];
  onCallback: (data: AT_Options) => void;
}
// NOTE: only use this page if its from attribute type upsert (NOT FROM PRODUCT VARIATION MODAL)
const MultiAttributeOptionsUpsert: React.FC<Partial<Props>> = ({ onCallback, singleData }) => {
  const { t } = useTranslation();
  const { attributeType_id: attributeTypeId } = useParams();
  // TODO write fallback component
  if (!attributeTypeId) return <Fallback />;
  const apiService = new ApiBuilder(`attribute-type-options`, t('AttributeOptions.Title'));

  const [pending, setPending] = useState<number>(-2);
  const [optionsData, setOptionsData] = useState([] as AT_Options[]);

  useEffect(() => {
    if (singleData) {
      setOptionsData(singleData);
    }
  }, [singleData]);

  const { mutate } = useMutation(({ id, values }: GlobalMutationProps<AttributeOptionsFormCtx>) => {
    return id ? apiService.updateOne(id, values) : apiService.createOne(values);
  });

  const handleSubmit = (id: number, formValues: Partial<AT_Options>) => {
    setPending(id);
    const { translate, sort, file_id } = formValues;

    const values: Partial<AT_Options> = {
      sort: sort ?? undefined,
      file_id: file_id ?? null,
      attribute_type_id: +attributeTypeId,
      translate: normalizeTranslate(translate),
    };

    // ID === -1 (when create a blank form (create attribute options) we give the id of -1)
    // So on If id is -1 create attribute attribute option otherwise update existing one.
    mutate(
      { id: id === -1 ? undefined : id, values },
      {
        onSuccess: (data: AT_Options) => {
          if (id === -1) {
            setOptionsData((prev) => prev.map((option) => (option.id === -1 ? data : option)));
          }
          onCallback?.(data);
        },
        onSettled: () => {
          setPending(-2);
        },
      },
    );
  };

  const defaultLocale = useContext(AuthContext).profile.language.locale;

  const onOptionCreate = () => {
    if (!singleData?.some((option) => option.id === -1)) {
      setOptionsData((prev) => [
        {
          id: -1,
          sort: null,
          file_path: null,
          translate: [{ locale: defaultLocale, value: '' }] as unknown,
        } as AT_Options,
        ...prev,
      ]);
    }
  };

  const onOptionRemove = (id: number) => {
    setOptionsData((prev) => prev.filter((option) => option.id !== id));

    if (id !== -1) {
      // TODO: useMutation
      // TODO: Loading for remove btn
      deleteSingleOption(id);
    }
  };

  return (
    <MainContainer>
      <Row className="header" justify="space-between">
        <Col>
          <Typography.Title level={4}>Options List</Typography.Title>
        </Col>

        <Col>
          <Button icon={<PlusCircleOutlined />} type="primary" onClick={onOptionCreate}>
            {t('Global.Create')}
          </Button>
        </Col>
      </Row>

      {optionsData.map((option, index) => (
        <AttributeOptionsForm
          // Need Attribute Type, when we call this form from modal there is no AttributeType Id to set options to it. therefore we have to use its select to choose that ID.
          needAT={false}
          initialValues={option}
          key={`option-${index}`}
          isPending={pending === option.id}
          onRemove={() => onOptionRemove(option.id)}
          onSubmit={(values) => handleSubmit(option.id, values)}
        />
      ))}
    </MainContainer>
  );
};

export default MultiAttributeOptionsUpsert;

const MainContainer = styled.div`
  & .header {
    padding: 16px 0;

    & button {
      min-width: 180px;
    }
  }
`;
