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

import { OnbordingArrayProps } from './OnbordingArrayInput.entity';
import Styles from './OnbordingInput.style';
import { TextEditor, Upload, UploadLabel } from '..';

export default function OnbordingArrayInput({
  isEditor = false,
  disabled = false,
  hasLocale = true,
  name = 'translate',
  inputName = 'name',
  selectName = 'locale',
  isTitleRequired = true,
  form=null,
  inputDesc = 'Onbording',
  isOnbordingRequired = true,
}: Partial<OnbordingArrayProps>): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.OnbordingInputContainer>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
             
              <div key={key} className="field">
                 <Row gutter={[16, 0]}>
              
              <Col span={12}>
              
          <Form.Item  name={[name, "title"]} label={t('Coupon.Field.Codes')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Coupon.Field.Codes') })} />
          </Form.Item>
         
          <Form.Item name={[name, "file_patch" ]} label={t('Availability.Field.File')}>
            <Upload pathName="file_patch" type={'normal'} form={form} valueName="file_patch" idName="file_patch" key={'file_path'} />
          </Form.Item>

       
        
        </Col>
        <Col xs={12}>
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    label={t('Global.Description')}
                    name={[name, "description"]}
                    fieldKey={[fieldKey, inputDesc]}
                    rules={[
                      {
                        required: isOnbordingRequired,
                        message: `Item ${name + 1} ${inputDesc} is required`,
                      },
                    ]}
                  >
                    {isEditor ? (
                      <TextEditor disabled={disabled} />
                    ) : (
                      <Input.TextArea
                        rows={5}
                        disabled={disabled}
                        placeholder={t('Global.InputPlaceholder', { title: t('Global.Description') })}
                      />
                    )}
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
    </Styles.OnbordingInputContainer>
  );
}
