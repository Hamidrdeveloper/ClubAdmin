import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { LanguageSelect } from '@src/modules/Language';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { NameArrayProps } from './NameArrayInput.entity';
import Styles from './NameInput.style';

const NameArrayInput: React.FC<NameArrayProps> = ({
  disabled,
  hasLabel = true,
  name = 'translate',
  inputName = 'name',
  selectName = 'locale',
  placeholder = 'Enter Name Here ...',
}) => {
  const { t } = useTranslation();

  return (
    <Form.List name={name} initialValue={[{}]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
            <Styles.NameInputContainer key={key}>
              <Input.Group>
                <Row style={{ width: '100%' }} gutter={[0, 16]}>
                  <Col>
                    <Form.Item
                      {...restField}
                      required
                      name={[name, selectName]}
                      fieldKey={[fieldKey, selectName]}
                      label={hasLabel ? t('Global.Language') : ''}
                      rules={[{ required: true, message: `Item ${name + 1} Language is required` }]}
                    >
                      <LanguageSelect isGroup disabled={disabled} />
                    </Form.Item>
                  </Col>

                  <Col flex={1}>
                    <Form.Item
                      {...restField}
                      required
                      name={[name, inputName]}
                      fieldKey={[fieldKey, inputName]}
                      label={hasLabel ? t('Global.Title') : ''}
                      rules={[{ required: true, message: `Item ${name + 1} ${inputName} is required` }]}
                    >
                      <Input disabled={disabled} placeholder={placeholder} />
                    </Form.Item>
                  </Col>
                </Row>
              </Input.Group>

              {!disabled && (
                <div>
                  {index < 1 ? (
                    <Space>
                      <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add(null, 0)} />

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
                  ) : (
                    <Button
                      ghost
                      danger
                      type="primary"
                      icon={<DeleteOutlined />}
                      onClick={() => remove(name)}
                    />
                  )}
                </div>
              )}
            </Styles.NameInputContainer>
          ))}
        </>
      )}
    </Form.List>
  );
};

export default NameArrayInput;
