import { AttributeTypes } from '@src/modules/AttributeType';
import { VariationCategory, VariationCategorySelect } from '@src/modules/VariationCategory';
import { FormSubmit, InlineSvg, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row, Spin, Typography } from 'antd';
import queryString from 'query-string';
import React, { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { VariationAttribute, VariationAttributes } from '../model/ProductVariation-args';
import { getAttributeTypes } from '../services';
import AttributeSingleForm from './AttributeSingleForm';
import FormStyle from './styles/Form.style';

const queryStringProps = {
  encode: false,
  skipNull: true,
  skipEmptyString: true,
};

interface VariationAttributeFormProps extends FormProps<VariationAttributes> {
  attributeTypes: AttributeTypes[];
  setAttributeTypes: Dispatch<SetStateAction<AttributeTypes[]>>;
}

const VariationAttributesForm: React.FC<VariationAttributeFormProps> = ({
  onSubmit,
  initialValues,
  isPending: formPending,
  attributeTypes,
  setAttributeTypes,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    if (initialValues) {
      const { attributes, productVariationCategories } = initialValues;
      form.setFieldsValue({
        attributes: attributes.length === 0 ? [{}] : attributes,
        productVariationCategories,
      });

      handleCategoryChange(productVariationCategories);
    }
  }, [initialValues]);

  const handleCategoryChange = (categories: VariationCategory[]) => {
    const categoryIds = categories.map((category) => category.id);
    const ids = queryString.stringify({ productVariationCategoryIds: categoryIds }, queryStringProps);

    console.log();

    setPending(true);
    getAttributeTypes(ids)
      .then((data) => {
        setPending(false);
        const prevValues = form.getFieldValue('attributes');

        form.setFieldsValue({
          attributes: prevValues.filter((prev) => data.some((attr) => attr.id === prev.attribute_type_id)),
        });

        const initialValuesAttributesIds: number[] = [];
        initialValues?.attributes?.forEach((item) => {
          initialValuesAttributesIds.push(item?.attributeType?.id);
        });

        const attributeIds: number[] = [];

        data?.forEach((item) => {
          attributeIds.push(item?.id);
        });

        const filteredAttributesIds = attributeIds?.filter(function (attr) {
          return !initialValuesAttributesIds?.includes(attr);
        });

        const filteredAttributes = data?.filter((attr) => {
          return filteredAttributesIds?.includes(attr?.id);
        });

        setAttributeTypes(filteredAttributes);
      })
      .catch(() => setPending(false));
  };

  const handleAddAttribute = (data: AttributeTypes) => {
    setAttributeTypes((prevState) => [...prevState, data]);
  };

  const handleChangeToNewType = (fieldKey: number) => {
    const attributes = form.getFieldValue('attributes');

    const updatedAttributes: VariationAttribute[] = attributes.map(
      (attribute: VariationAttribute, index: number) =>
        index === fieldKey ? { ...attribute, attributeTypeOption: null } : attribute,
    );

    form.setFieldsValue({ attributes: updatedAttributes });
  };

  return (
    <FormStyle.FormContainer form={form} layout="vertical" onFinish={onSubmit}>
      <Typography.Title style={{ marginTop: 16 }} level={3}>
        {t('Product.Variation.Attributes.VariationAttributes')}
      </Typography.Title>

      <Suspense fallback={<Loader title={t('Product.Variation.Loader')} />}>
        <FormContainer>
          <Form.Item
            name="productVariationCategories"
            label={t('Product.Variation.Attributes.ProductVariationCategory')}
          >
            <VariationCategorySelect isMulti hasNew={false} onChange={handleCategoryChange} />
          </Form.Item>

          <FieldSet>
            <legend>{'Attributes'.toUpperCase()}</legend>

            <Spin spinning={isPending} tip={t('Product.Variation.Attributes.Loading')}>
              <Row gutter={[16, 16]}>
                <Form.List name="attributes">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey }) => {
                        return (
                          <Col span={6} key={key}>
                            <AttributeSingleForm
                              name={name}
                              onRemove={remove}
                              fieldKey={fieldKey}
                              attributeTypes={attributeTypes}
                              onAddNewAttribute={handleAddAttribute}
                              onChangeToNewType={handleChangeToNewType}
                              selectedType={form.getFieldValue('attributes')[name]}
                              disabled={form.getFieldValue('attributes')[name]?.is_auto_generated}
                              setAttributeTypes={setAttributeTypes}
                            />
                          </Col>
                        );
                      })}

                      <EmptyAttribute onClick={() => add(null)} />
                    </>
                  )}
                </Form.List>
              </Row>
            </Spin>
          </FieldSet>
        </FormContainer>
      </Suspense>

      <FormSubmit isPending={formPending} />
    </FormStyle.FormContainer>
  );
};

export default VariationAttributesForm;

const FormContainer = styled.div`
  padding: 16px;
`;

const FieldSet = styled.fieldset`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  legend {
    color: #235b81;
    width: auto;
    padding: 0 10px;
    font-weight: bold;
    margin-bottom: 0;
    margin-left: 15px;
    border-bottom: 0;
  }
`;

const EmptyAttribute: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <Col span={6}>
      <EmptyAttributeContainer onClick={onClick}>
        <div className="icon">
          <InlineSvg src="/global/create.svg" width={50} height={50} />
        </div>

        <Typography.Title type="secondary" level={5}>
          {t('Product.Variation.Attributes.CreateNewAttributeType')}
        </Typography.Title>
      </EmptyAttributeContainer>
    </Col>
  );
};

const EmptyAttributeContainer = styled.div`
  height: 247.56px;
  border-radius: 4px;
  border: 1px dashed #d9d9d9;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  text-align: center;

  & .icon {
    margin-bottom: 16px;
  }
`;
