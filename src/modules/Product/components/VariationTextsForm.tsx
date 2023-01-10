import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@src/modules/Language';
import { EmptyCreate, FormSubmit, LanguageIcon, TextEditor } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationTranslate } from '../model/ProductVariation-args';
import FormStyle from './styles/Form.style';

const VariationTextsForm: React.FC<FormProps<VariationTranslate>> = ({
  onSubmit,
  isPending,
  initialValues,
}) => {
  const [form] = Form.useForm();
  const { Item: FormItem } = Form;
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const makePlaceholder = (title: string) => t('Global.InputPlaceholder', { title });

  return (
    <FormStyle.FormContainer
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        translate: [
          {
            name: '',
            locale: undefined,
            description: '',
            preview_text: '',
            meta_keywords: '',
            technical_data: '',
            meta_description: '',
          },
        ],
      }}
    >
      <Form.List name="translate">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <EmptyCreate title={t('Product.Variation.NoTextMsg')} onClick={() => add(null, 0)} />
            ) : (
              fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
                <FormStyle.FieldListDivider key={key}>
                  <Row gutter={16}>
                    <Col span={24}>
                      <FormItem label={t('Global.Name')}>
                        <Input.Group compact style={{ display: 'flex', flex: 1 }}>
                          <FormItem
                            {...restField}
                            noStyle
                            name={[name, 'locale']}
                            fieldKey={[fieldKey, 'locale']}
                            rules={[{ required: true }]}
                          >
                            <LanguageSelect isGroup />
                          </FormItem>
                          <FormItem
                            {...restField}
                            noStyle
                            name={[name, 'name']}
                            fieldKey={[fieldKey, 'name']}
                            rules={[{ required: true }]}
                          >
                            <Input
                              placeholder={makePlaceholder(t('Global.Name'))}
                              suffix={<LanguageIcon className="icon" />}
                            />
                          </FormItem>
                        </Input.Group>
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        name={[name, 'meta_description']}
                        fieldKey={[fieldKey, 'meta_description']}
                        label={t('Product.Variation.Texts.MetaDescription')}
                      >
                        <Input
                          placeholder={makePlaceholder(t('Product.Variation.Texts.MetaDescription'))}
                          suffix={<LanguageIcon className="icon" />}
                        />
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        name={[name, 'meta_keywords']}
                        fieldKey={[fieldKey, 'meta_keywords']}
                        label={t('Product.Variation.Texts.MetaKeywords')}
                      >
                        <Input
                          placeholder={makePlaceholder(t('Product.Variation.Texts.MetaKeywords'))}
                          suffix={<LanguageIcon className="icon" />}
                        />
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        name={[name, 'description']}
                        fieldKey={[fieldKey, 'description']}
                        rules={[{ required: true }]}
                        label={t('Global.Description')}
                      >
                        <TextEditor />
                      </FormItem>
                    </Col>

                    <Col span={12}>
                      <FormItem
                        name={[name, 'technical_data']}
                        fieldKey={[fieldKey, 'technical_data']}
                        label={t('Product.Variation.Texts.TechnicalData')}
                      >
                        <TextEditor />
                      </FormItem>
                    </Col>

                    <Col span={24}>
                      <FormItem
                        name={[name, 'preview_text']}
                        fieldKey={[fieldKey, 'preview_text']}
                        label={t('Product.Variation.Texts.PreviewText')}
                      >
                        <TextEditor />
                      </FormItem>
                    </Col>
                  </Row>

                  <Row justify="end" gutter={8}>
                    {index === 0 ? (
                      <Col>
                        <Button ghost type="primary" onClick={() => add(null, 0)} icon={<PlusOutlined />} />
                      </Col>
                    ) : (
                      <Col>
                        <Button
                          ghost
                          danger
                          type="primary"
                          onClick={() => remove(name)}
                          icon={<MinusOutlined />}
                        />
                      </Col>
                    )}
                  </Row>
                </FormStyle.FieldListDivider>
              ))
            )}
          </>
        )}
      </Form.List>

      <FormSubmit isPending={isPending} />
    </FormStyle.FormContainer>
  );
};

export default VariationTextsForm;
