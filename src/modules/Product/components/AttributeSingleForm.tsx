import { DeleteOutlined } from '@ant-design/icons';
import i18n from '@src/core/i18n/config';
import AttributeOptionsSelect from '@src/modules/AttributeOptions/containers/AttributeOptionInnerSelect';
import { AT_Options } from '@src/modules/AttributeOptions/model/attributeOptions.entity';
import { AttributeTypeInnerSelect, AttributeTypes } from '@src/modules/AttributeType';
import AttributeTypeModule from '@src/modules/AttributeType/AttributeType.module';
import DeletePrompt from '@src/shared/components/DeletePrompt';
import { Button, Checkbox, Col, Form, Row, Typography } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { VariationAttribute } from '../model/ProductVariation-args';

type Props = {
  name: number;
  fieldKey: number;
  disabled: boolean;
  attributeTypes: AttributeTypes[];
  selectedType?: VariationAttribute;
  onRemove: (fieldKey: number) => void;
  onChangeToNewType: (fieldKey: number) => void;
  onAddNewAttribute: (data: AttributeTypes) => void;
  setAttributeTypes: Dispatch<SetStateAction<AttributeTypes[]>>;
};
const AttributeSingleForm: React.FC<Props> = ({
  name,
  fieldKey,
  onRemove,
  disabled,
  selectedType,
  attributeTypes,
  setAttributeTypes,
  onChangeToNewType,
  onAddNewAttribute,
}) => {
  const module = new AttributeTypeModule();
  const [isPending, setPending] = useState(false);
  const [typeOptions, setTypeOptions] = useState<AT_Options[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    if (selectedType) {
      handleTypeChange(selectedType.attributeType, true);
    }
  }, []);

  const handleAddTypeOption = (data: AT_Options) => {
    setTypeOptions((prev) => [...prev, data]);
  };

  const handleTypeChange = (type: AttributeTypes, isInitial?: boolean) => {
    if (!type) return;

    if (!isInitial) {
      const filteredAttributes: AttributeTypes[] = attributeTypes?.filter((attr) => {
        return attr?.id !== type?.id;
      });
      if (selectedType) {
        setAttributeTypes([...filteredAttributes, selectedType?.attributeType]);
      } else {
        setAttributeTypes(filteredAttributes);
      }
    }
    setPending(true);
    module.apiService
      .getOne(type.id)
      .then(({ attributeTypeOptions }) => {
        setTypeOptions(attributeTypeOptions);
        setPending(false);

        if (!isInitial) {
          onChangeToNewType(name);
        }
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer disabled={disabled}>
      {disabled && (
        <div className="auto-generate">
          <Typography className="title">{t('Product.Variation.Attributes.AutoGenerated')}</Typography>
        </div>
      )}
      <Form.Item
        required
        label={t('Product.Variation.Attributes.AttributeType')}
        name={[name, 'attributeType']}
        fieldKey={[fieldKey, 'attributeType']}
        rules={[{ required: true, message: `${t('Product.Variation.Attributes.RequiredAttribute')}` }]}
      >
        <AttributeTypeInnerSelect
          disabled={disabled}
          options={attributeTypes}
          onAdd={onAddNewAttribute}
          onSelect={handleTypeChange}
        />
      </Form.Item>

      <Form.Item
        required
        label={t('Product.Variation.Attributes.AttributeTypeOption')}
        name={[name, 'attributeTypeOption']}
        fieldKey={[fieldKey, 'attributeTypeOption']}
        rules={[
          { required: true, message: `${t('Product.Variation.Attributes.RequiredAttributeTypeOption')}` },
        ]}
      >
        <AttributeOptionsSelect
          disabled={disabled}
          isPending={isPending}
          options={typeOptions}
          onAdd={handleAddTypeOption}
          attributeType={selectedType?.attributeType}
        />
      </Form.Item>

      <Row justify="space-between" align="middle">
        <Col>
          <Form.Item name={[name, 'visible']} fieldKey={[fieldKey, 'visible']} valuePropName="checked">
            <Checkbox>{i18n.t('Global.IsVisible')}</Checkbox>
          </Form.Item>
        </Col>

        {!disabled && (
          <Col>
            <DeletePrompt
              onConfirm={() => {
                onRemove(name);
                if (selectedType) {
                  handleTypeChange(selectedType?.attributeType, false);
                }
              }}
            >
              <Button ghost danger type="primary" icon={<DeleteOutlined />} />
            </DeletePrompt>
          </Col>
        )}
      </Row>
    </MainContainer>
  );
};

export default AttributeSingleForm;

const MainContainer = styled.div<{ disabled: boolean }>`
  padding: 16px 16px 0 16px;
  border-radius: 4px;
  background: #ececec;
  border: 1px solid #d9d9d9;
  position: relative;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  & .auto-generate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    z-index: 10;

    & .title {
      position: absolute;
      right: 16px;
      top: 16px;
      color: #d9d9d9;
      z-index: 11;
      color: red;
    }
  }
`;
