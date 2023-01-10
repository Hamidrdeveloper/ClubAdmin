/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@modules/Language';
import { Button, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { QuizArrayProps } from './QuizArrayInput.entity';
import Styles from './QuizInput.style';
import { TextEditor } from '..';

export default function QuizArrayInput({
  isEditor = false,
  disabled = false,
  hasLocale = true,
  name = 'translate',
  inputName = 'name',
  selectName = 'locale',
  isTitleRequired = true,
  inputDesc = 'Quiz',
  isQuizRequired = true,
}: Partial<QuizArrayProps>): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.QuizInputContainer>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              
              <div key={key} className="field">
                  <div className="icon-container">
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    label={t('Global.Description')}
                    name={[name, inputDesc]}
                    fieldKey={[fieldKey, inputDesc]}
                    rules={[
                      {
                        required: isQuizRequired,
                        message: `Item ${name + 1} ${inputDesc} is required`,
                      },
                    ]}
                  >
                    {isEditor ? (
                      <TextEditor disabled={disabled} />
                    ) : (
                      <Input.TextArea
                        rows={4}
                        disabled={disabled}
                        placeholder={t('Global.InputPlaceholder', { title: t('Global.Description') })}
                      />
                    )}
                  </Form.Item>
                </div>
                    <Row gutter={[16, 0]}>
        <Col xs={12}>
          <Form.Item label={t('Coupon.Field.MaxQuantityEachUser')} name="max_quantity_each_user">
            <Select
              options={[
                { value: 5, label: 5 },
                { value: 10, label: 10 },
                { value: 15, label: 15 },
                { value: 20, label: 20 },
              ]}
              placeholder={t('Global.SelectPlaceholder', { title: t('Global.Amount') })}
            />
          </Form.Item>
        </Col>

        

        <Col span={12}>
          <Form.Item name={['couponCodes', 0, 'code']} label={t('Coupon.Field.Codes')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Coupon.Field.Codes') })} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xs={12}>
                <Form.Item labelCol={{ span: 12 }} required={isTitleRequired} label={'Name'}>
                 
               
                    <Form.Item
                      {...restField}
                      labelCol={{ span: 11 }}
                      noStyle
                      name={[name, inputName]}
                      fieldKey={[fieldKey, inputName]}
                      rules={[
                        { required: isTitleRequired, message: `Item ${name + 1} ${inputName} is required` },
                      ]}
                    >
                      <Input
                        placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })}
                        disabled={disabled}
                      />
                    </Form.Item>
             
                </Form.Item>
                
                </Col>
                </Row>
                {index < 1 ? (
                  <Row justify="end" gutter={8}>
                    <Col>
                      <Button
                        ghost
                        type="primary"
                        disabled={disabled}
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
                          disabled={disabled}
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Col>
                    )}
                  </Row>
                ) : (
                  <Button
                    ghost
                    danger
                    type="primary"
                    disabled={disabled}
                    icon={<DeleteOutlined />}
                    onClick={() => remove(name)}
                  />
                )}
              </div>
            ))}
          </>
        )}
      </Form.List>
    </Styles.QuizInputContainer>
  );
}
