import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@modules/Language';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { DescriptionArrayProps } from './DescriptionArrayInput.entity';
import Styles from './DescriptionInput.style';
import { TextEditor } from '..';

export default function DescriptionArrayInput({
  isEditor = false,
  disabled = false,
  hasLocale = true,
  name = 'translate',
  inputName = 'name',
  selectName = 'locale',
  isTitleRequired = true,
  inputDesc = 'description',
  isDescriptionRequired = true,
}: Partial<DescriptionArrayProps>): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.DescriptionInputContainer>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
              <div key={key} className="field">
                <Form.Item labelCol={{ span: 24 }} required={isTitleRequired} label={'Name'}>
                  <Input.Group compact>
                    {hasLocale && (
                      <Form.Item
                        {...restField}
                        noStyle
                        name={[name, selectName]}
                        fieldKey={[fieldKey, selectName]}
                        rules={[
                          {
                            required: isTitleRequired,
                            message: `Item ${name + 1} ${selectName} is required`,
                          },
                        ]}
                      >
                        <LanguageSelect isGroup disabled={disabled} />
                      </Form.Item>
                    )}
                    <Form.Item
                      {...restField}
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
                  </Input.Group>
                </Form.Item>
                <div className="icon-container">
                  <Form.Item
                    {...restField}
                    labelCol={{ span: 24 }}
                    label={t('Global.Description')}
                    name={[name, inputDesc]}
                    fieldKey={[fieldKey, inputDesc]}
                    rules={[
                      {
                        required: isDescriptionRequired,
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
    </Styles.DescriptionInputContainer>
  );
}
