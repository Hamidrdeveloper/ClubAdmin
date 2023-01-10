import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { PackageSelect } from '@src/modules/Package';
import { EmptyCreate, FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationPackage } from '../model/ProductVariation-args';
import Styles from './styles/Form.style';

const VariationPackageForm: React.FC<FormProps<VariationPackage>> = ({
  onSubmit,
  isPending,
  initialValues,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        packages: initialValues.packages.map((pack) => ({ package: pack, quantity: pack.quantity })),
      });
    }
  }, [initialValues]);

  const makePlaceholder = (title: string) => t('Global.InputPlaceholder', { title });

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit} name="variation-settings-form">
      <Form.List name="packages">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <EmptyCreate title={t('Product.Variation.NoPackageMsg')} onClick={() => add(null, 0)} />
            ) : (
              fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
                <Styles.FieldListDivider key={key}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'package']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'package']}
                        label={t('Package.Title')}
                      >
                        <PackageSelect />
                      </Form.Item>
                    </Col>

                    <Col span={12}>
                      <Form.Item
                        {...restField}
                        name={[name, 'quantity']}
                        fieldKey={[fieldKey, 'quantity']}
                        label={t('Global.Quantity')}
                        rules={[{ required: true }, { type: 'number', min: 1 }]}
                      >
                        <InputNumber placeholder={makePlaceholder(t('Global.Quantity'))} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="end" gutter={8}>
                    {index === 0 && (
                      <Col>
                        <Button ghost type="primary" onClick={() => add(null, 0)} icon={<PlusOutlined />} />
                      </Col>
                    )}

                    <Col>
                      <Button
                        ghost
                        danger
                        type="primary"
                        onClick={() => remove(name)}
                        icon={<MinusOutlined />}
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

export default VariationPackageForm;
