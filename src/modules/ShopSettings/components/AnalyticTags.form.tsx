import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@src/modules/Language';
import { FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import React, { Fragment, ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AnalyticTagsModel } from '../model/analyticTags.entity';

export const AnalyticTagsForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<AnalyticTagsModel[]>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        data: initialValues.map((tag) => ({ ...tag, locale: { locale: tag.locale } })),
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="analyticTagsSetting-form"
      onFinish={(data) => {
        onSubmit(data['data'].map((tag) => ({ ...tag, locale: tag['locale']['locale'] })));
      }}
      initialValues={{ data: [{ locale: undefined, google: undefined, 'microsoft-uet': undefined }] }}
    >
      <Suspense fallback={<Loader />}>
        <Form.Item>
          <Form.List name={'data'}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                  <Fragment key={key}>
                    <Row gutter={[16, 0]} justify="end" align="middle">
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          required
                          name={[name, 'locale']}
                          label={t('Language.Title')}
                          fieldKey={[fieldKey, 'locale']}
                        >
                          <LanguageSelect />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          required
                          label={t('Global.Google')}
                          name={[name, 'google']}
                          fieldKey={[fieldKey, 'google']}
                        >
                          <Input
                            placeholder={t('Global.InputPlaceholder', {
                              title: t('Global.Google'),
                            })}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          {...restField}
                          required
                          label={t('Global.Microsoft')}
                          name={[name, 'microsoft-uet']}
                          fieldKey={[fieldKey, 'microsoft-uet']}
                        >
                          <Input
                            placeholder={t('Global.InputPlaceholder', { title: t('Global.Microsoft') })}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={3}>
                        <Space>
                          {index === 0 && (
                            <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                          )}

                          {fields.length > 1 && (
                            <Button
                              ghost
                              danger
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() => remove(name)}
                            />
                          )}
                        </Space>
                      </Col>
                    </Row>
                    <Divider />
                  </Fragment>
                ))}
              </>
            )}
          </Form.List>
        </Form.Item>

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
};
