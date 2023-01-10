import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd';
import React, { Fragment, ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BankAccountModel } from '../model/bankAccount.entity';

export const BankAccountForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<BankAccountModel[]>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ data: [...initialValues] });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="bankAccountSetting-form"
      onFinish={(data) => onSubmit(data['data'])}
      initialValues={{ data: [{ bank_name: undefined, bank_account_number: undefined, iban: undefined }] }}
    >
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
                        label={t('ShopSettings.Field.BankName')}
                        name={[name, 'bank_name']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'bank_name']}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('ShopSettings.Field.BankName'),
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        rules={[{ required: true }]}
                        label={t('ShopSettings.Field.BankAccountNumber')}
                        name={[name, 'bank_account_number']}
                        fieldKey={[fieldKey, 'bank_account_number']}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('ShopSettings.Field.BankAccountNumber'),
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        name={[name, 'iban']}
                        rules={[{ required: true }]}
                        fieldKey={[fieldKey, 'iban']}
                        label={t('ShopSettings.Field.Iban')}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Iban') })}
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
    </Form>
  );
};
