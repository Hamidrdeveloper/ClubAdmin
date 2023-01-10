import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { EmptyCreate, FormSubmit, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, InputNumber, Row, Select, Typography } from 'antd';
import { SelectValue } from 'antd/lib/select';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationFiles } from '../model/ProductVariation-args';
import Styles from './styles/Form.style';

const VariationFilesForm: React.FC<FormProps<VariationFiles>> = ({ onSubmit, isPending, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [linkTypes, setLinkTypes] = useState<number[]>([]);
  const [imageTypes, setImageTypes] = useState<number[]>([]);

  const handleTypeChange = (value: SelectValue, idx: number) => {
    if (value === 'youtube') {
      setImageTypes((prev) => [...prev, idx]);
      setLinkTypes((prev) => prev.filter((id) => id !== idx));
    } else {
      setLinkTypes((prev) => [...prev, idx]);
      setImageTypes((prev) => prev.filter((id) => id !== idx));
    }
  };

  useEffect(() => {
    if (initialValues?.productVariationFiles) {
      if (initialValues.productVariationFiles.length > 0) {
        form.setFieldsValue({
          productVariationFiles: initialValues.productVariationFiles.map(({ file_self_id, ...rest }) => ({
            ...rest,
            file_id: file_self_id,
          })),
        });
        const links: number[] = [];
        const images: number[] = [];
        initialValues.productVariationFiles.forEach((file, index: number) => {
          if (file.type === 'youtube') {
            images.push(index);
          } else {
            links.push(index);
          }
        });

        setLinkTypes(links);
        setImageTypes(images);
      }
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      colon={false}
      layout="horizontal"
      onFinish={onSubmit}
      labelCol={{ span: 2 }}
      name="variation-files-form"
      initialValues={{ productVariationFiles: [{ type: undefined }] }}
    >
      <Typography.Title style={{ marginTop: 16 }} level={3}>
        {t('Product.Variation.File.ProductVariationFiles')}
      </Typography.Title>
      <Form.List name="productVariationFiles">
        {(fields, { add, remove }) => (
          <>
            {fields.length === 0 ? (
              <EmptyCreate
                onClick={() => add({ type: undefined })}
                title={t('Product.Variation.NoDataMsg')}
              />
            ) : (
              // TODO: maybe sort 'sorts' ascending, or descending
              fields.reverse().map(({ key, name, fieldKey, ...restField }, index: number) => (
                <Styles.FieldListDivider key={key}>
                  <Row gutter={16}>
                    <Col span={8} style={{ height: '205px' }}>
                      <Form.Item {...restField} name={[name, 'file']} fieldKey={[fieldKey, 'file']}>
                        <Upload
                          form={form}
                          type="dragger"
                          disabled={imageTypes.some((idx) => idx === name)}
                          idName={['productVariationFiles', name, 'file_id']}
                        />
                      </Form.Item>
                      <Form.Item
                        hidden
                        {...restField}
                        name={[name, 'file_id']}
                        fieldKey={[fieldKey, 'file_id']}
                      >
                        <></>
                      </Form.Item>
                    </Col>
                    <Col span={16}>
                      <Form.Item
                        {...restField}
                        name={[name, 'type']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'type']}
                        label={t('Product.Variation.File.Type')}
                      >
                        <Select
                          onChange={(value) => handleTypeChange(value, name)}
                          placeholder={t('Global.SelectPlaceholder', {
                            title: t('Product.Variation.File.Type'),
                          })}
                          options={[
                            {
                              label: t('Product.Variation.File.Image'),
                              value: 'image',
                            },
                            {
                              label: t('Product.Variation.File.Media'),
                              value: 'media',
                            },
                            {
                              label: 'Youtube',
                              value: 'youtube',
                            },
                            {
                              label: t('Product.Variation.File.Certificate'),
                              value: 'certificate',
                            },
                          ]}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'title']}
                        label={t('Product.Variation.File.Title')}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('Product.Variation.File.Title'),
                          })}
                        />
                      </Form.Item>

                      {!linkTypes.some((idx) => idx === name) && (
                        <Form.Item
                          {...restField}
                          name={[name, 'link']}
                          fieldKey={[fieldKey, 'link']}
                          label={t('Product.Variation.File.Link')}
                        >
                          <Input
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('Product.Variation.File.Link'),
                            })}
                          />
                        </Form.Item>
                      )}

                      <Form.Item
                        {...restField}
                        name={[name, 'sort']}
                        fieldKey={[fieldKey, 'name']}
                        label={t('Global.Sort')}
                      >
                        <InputNumber
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('Global.Sort'),
                          })}
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="end" gutter={8}>
                    {index === 0 && (
                      <Col>
                        <Button
                          ghost
                          type="primary"
                          icon={<PlusOutlined />}
                          onClick={() => add({ type: undefined })}
                        />
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

export default VariationFilesForm;
