import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@modules/Language';
import { FormSubmit, Loader } from '@shared/components';
import { LanguageIcon, TextEditor } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Template } from '../model/template.entity';

export default function TemplateForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Template>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="template-form"
      initialValues={{ translate: [{ locale: undefined, title: '' }] }}
    >
      <Suspense fallback={<Loader />}>
        <Form.Item name="slug" label={t('Template.Field.Slug')}>
          <Input placeholder={t('Global.InputPlaceholder', { title: t('Template.Field.Slug') })} />
        </Form.Item>

        <Form.List name={'translate'}>
          {(fields, { add, remove }) => (
            <div className="form-list">
              {fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
                <div className="form-list-item" key={key}>
                  <Form.Item label={t('Global.Title')}>
                    <Input.Group compact style={{ display: 'flex', flex: 1 }}>
                      <Form.Item
                        {...restField}
                        noStyle
                        name={[name, 'locale']}
                        fieldKey={[fieldKey, 'locale']}
                        rules={[{ required: true, message: `Item ${name + 1} locale is required` }]}
                      >
                        <LanguageSelect isGroup />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        noStyle
                        name={[name, 'title']}
                        fieldKey={[fieldKey, 'title']}
                        rules={[{ required: true, message: `Item ${name + 1} title is required` }]}
                      >
                        <Input
                          suffix={<LanguageIcon className="icon" />}
                          placeholder={t('Global.InputPlaceholder', { title: t('Global.Title') })}
                        />
                      </Form.Item>
                    </Input.Group>
                  </Form.Item>

                  <Row gutter={[16, 0]}>
                    <Col xs={12}>
                      <Form.Item label={t('Template.Field.Body')} name={[name, 'body']}>
                        <TextEditor />
                      </Form.Item>
                    </Col>

                    <Col xs={12}>
                      <Form.Item label={t('Template.Field.Summary')} name={[name, 'summary']}>
                        <TextEditor />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="end" gutter={8}>
                    {index < 1 ? (
                      <>
                        <Col>
                          <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add(null, 0)} />
                        </Col>

                        {fields.length > 1 && (
                          <Col>
                            <Button
                              ghost
                              danger
                              type="primary"
                              icon={<DeleteOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Col>
                        )}
                      </>
                    ) : (
                      <Button
                        ghost
                        danger
                        type="primary"
                        icon={<DeleteOutlined />}
                        onClick={() => remove(name)}
                      />
                    )}
                  </Row>
                </div>
              ))}
            </div>
          )}
        </Form.List>
        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
