import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormSubmit, TextEditor } from '@shared/components';
import AsyncCompanySelect from '@src/modules/Company/container/AsyncCompanySelect';
import { RoleSelect } from '@src/modules/Role';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSelect } from '../../Language';
import { LegalCondition } from '../model/legalCondition.entity';

export default function LegalConditionForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<LegalCondition>): ReactElement {
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
      name="legalCondition-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, description: undefined }] }}
    >
      <Form.Item name="roles" label={t('Global.Roles')} rules={[{ required: true }]}>
        <RoleSelect isMulti />
      </Form.Item>

      <Form.Item name="company" label={t('LegalCondition.Field.Company')} rules={[{ required: true }]}>
        <AsyncCompanySelect />
      </Form.Item>
      <div className="dash-end">
        <Form.List name="translate">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Row gutter={[16, 0]} key={key}>
                  <Col xs={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'locale']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'locale']}
                      label={t('Language.Title')}
                    >
                      <LanguageSelect />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      {...restField}
                      name={[name, 'description']}
                      label={t('LegalCondition.Field.Description')}
                      fieldKey={[fieldKey, 'description']}
                    >
                      <TextEditor />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row justify="end" gutter={8}>
                      {index < 1 ? (
                        <>
                          <Col>
                            <Button
                              ghost
                              type="primary"
                              icon={<PlusOutlined />}
                              onClick={() => add(null, 0)}
                            />
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
                    </Row>
                  </Col>
                </Row>
              ))}
            </>
          )}
        </Form.List>
      </div>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
