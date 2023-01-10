import { FormSubmit, Loader, NameArrayInput, Upload } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import DownloadCategorySelect from '../container/DownloadCategorySelect';
import { DownloadCategoryModel } from '../model/DownloadCategory.entity';
import { selectedCategoryAtom } from '../service/DownloadCategory.store';
import Style from './style/Form.style';

export default function DownloadCategoryForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<DownloadCategoryModel>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [selectedCategory] = useAtom(selectedCategoryAtom);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Style.MainContainer radius={10}>
      <Form
        form={form}
        colon={false}
        labelAlign="left"
        layout={'vertical'}
        onFinish={onSubmit}
        name="download-category-form"
        labelCol={{ xs: { span: 8 } }}
        initialValues={{ translate: [{ locale: undefined, name: '' }], is_active: true }}
      >
        <Suspense fallback={<Loader />}>
          <Row gutter={16}>
            <Col xs={24} md={6}>
              <Form.Item name="slug" label={t('Download.Category.Slug')} rules={[{ required: true }]}>
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Download.Category.Slug') })} />
              </Form.Item>
            </Col>
            <Col xs={24} md={18}>
              <Form.Item required>
                <NameArrayInput />
              </Form.Item>
            </Col>
          </Row>

          <Style.FieldSet>
            <legend>
              {
                <Form.Item name={'is_active'} valuePropName="checked" className="checkbox-legend">
                  <Checkbox>{t('Global.IsActive')}</Checkbox>
                </Form.Item>
              }
            </legend>

            <Form.Item name="file_path">
              <Upload form={form} />
            </Form.Item>
            <Form.Item name="file_id" hidden>
              <></>
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Suspense fallback={FallbackSelect(t('Download.Category.Parent'))}>
                  <Form.Item name="parent" label={t('Download.Category.Parent')}>
                    <DownloadCategorySelect exceptId={selectedCategory?.id} />
                  </Form.Item>
                </Suspense>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item name="sort" label={t('Global.Sort')}>
                  <InputNumber
                    min={0}
                    placeholder={t('Global.InputPlaceholder', { title: t('Global.Sort') })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Style.FieldSet>

          <FormSubmit isPending={isPending} />
        </Suspense>
      </Form>
    </Style.MainContainer>
  );
}
