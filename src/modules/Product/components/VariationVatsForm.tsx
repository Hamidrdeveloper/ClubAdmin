import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { EmptyCreate, FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Row } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationVats } from '../model/ProductVariation-args';
import Styles from './styles/Form.style';
import VariationVatCountryPair from './VariationVatCountryPair';

const VariationVatForm: React.FC<FormProps<VariationVats>> = ({ onSubmit, isPending, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [selectedCountryIds, setSelectedCountryIds] = useState<number[]>();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSelectedCountryIds(
        initialValues.productVariationVats.map((variationVat) => variationVat.country.id),
      );
    }
  }, [initialValues]);

  const removeFromSelectedCountries = useCallback((name: number, removeFromFormList) => {
    const variationVats: VariationVats['productVariationVats'] = form.getFieldValue('productVariationVats');

    const removedCountryId = variationVats?.[name]?.country?.id;
    setSelectedCountryIds((prevSelected) =>
      prevSelected?.filter((selectedId) => removedCountryId !== selectedId),
    );

    removeFromFormList(name);
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} name="variation-vats-form">
      <Form.List name="productVariationVats">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <EmptyCreate title={t('Product.Variation.NoVatMsg')} onClick={() => add(null, 0)} />
            ) : (
              fields.map(({ key, name, fieldKey }, index: number) => (
                <Styles.FieldListDivider key={key}>
                  <Row gutter={16} align="middle">
                    <VariationVatCountryPair
                      form={form}
                      selectedCountryIDs={selectedCountryIds}
                      setSelectedCountryIDs={setSelectedCountryIds}
                      vatProps={{ name: [name, 'id'], fieldKey: [fieldKey, 'id'] }}
                      countryProps={{ name: [name, 'country'], fieldKey: [fieldKey, 'country'] }}
                    />

                    {index === 0 && (
                      <Col style={{ marginTop: 4 }}>
                        <Button ghost type="primary" onClick={() => add(null, 0)} icon={<PlusOutlined />} />
                      </Col>
                    )}

                    <Col style={{ marginTop: 4 }}>
                      <Button
                        ghost
                        danger
                        type="primary"
                        icon={<MinusOutlined />}
                        onClick={() => {
                          // send remove as a callback fn
                          removeFromSelectedCountries(name, remove);
                        }}
                      />
                    </Col>
                  </Row>
                </Styles.FieldListDivider>
              ))
            )}
          </>
        )}
      </Form.List>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default VariationVatForm;
