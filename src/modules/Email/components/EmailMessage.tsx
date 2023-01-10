import { LanguageSelect } from '@src/modules/Language';
import { TextEditor } from '@src/shared/components';
import { Col, Form, FormInstance, Input, Row, Space, Tabs } from 'antd';
import React, { MouseEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './styles/Email.style';
import VariablesSelect from './TemplateVariablesSelect';

const { TabPane } = Tabs;

const EmailMessage = ({ form }: { form: FormInstance }): ReactElement => {
  const { t } = useTranslation();
  const { Item: FormItem } = Form;
  // const [editorType, setEditorType] = useState('editor');
  const [activeTab, setActiveTab] = useState('1');
  const [textBoxPosition, setTextBoxPosition] = useState(0);

  const handleVariableChange = (variable: string, field: string) => {
    const prevValue = String(form.getFieldValue(['translate', field]) ?? '');

    if (field === 'html') {
      form.setFieldsValue({
        translate: {
          [field]:
            (prevValue.length > 0 ? prevValue.substring(0, prevValue.length - 4) : '') +
            `{{${variable}}}` +
            (prevValue.length > 0 ? prevValue.substring(prevValue.length - 4) : ''),
        },
      });
    } else {
      form.setFieldsValue({
        translate: {
          [field]:
            prevValue.substring(0, textBoxPosition) +
            `{{${variable}}}` +
            prevValue.substring(textBoxPosition, prevValue.length),
        },
      });
    }
  };

  const getCursorPosition = (event: MouseEvent) => {
    setTextBoxPosition(event.target['selectionStart']);
  };

  return (
    <Styles.MainContainer>
      <Styles.FormContainer>
        <Row>
          <Col span={24} className="customBoxShadow formContainer">
            <FormItem
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={['translate', 'locale']}
              label={t('Email.Field.SelectLanguage')}
            >
              <LanguageSelect />
            </FormItem>
          </Col>
          <Col span={24} className="customBoxShadow formContainer">
            <FormItem
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={['translate', 'title']}
              label={t('Email.Field.Subject')}
            >
              <Input.TextArea rows={4} placeholder={t('Email.Field.EnterEmailSubject')} />
            </FormItem>
          </Col>
        </Row>

        <div className="message-content">
          <Row gutter={[16, 16]} className="content">
            <Col span={24}>
              <Tabs
                className="settings-tab"
                type="card"
                onTabClick={(activeTab) => {
                  setActiveTab(activeTab);
                }}
                defaultActiveKey="1"
              >
                <TabPane tab={t('Email.Field.PlainText')} key="1">
                  <Row>
                    <Col span={6} style={{ paddingBottom: 16 }}>
                      <VariablesSelect
                        onChange={(variable) => handleVariableChange(variable, 'plain_text')}
                      />
                    </Col>
                    <Col span={24}>
                      <FormItem
                        wrapperCol={{ span: 24 }}
                        name={['translate', 'plain_text']}
                        rules={[{ required: activeTab === '1' }]}
                      >
                        <Input.TextArea
                          rows={22}
                          onClick={getCursorPosition}
                          placeholder={t('Email.Field.EnterEmailContentHere')}
                        />
                      </FormItem>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane forceRender tab={t('Email.Field.TextInHtmlFormat')} key="2">
                  <Space className="content">
                    {/* <Select
                      style={{ width: 250 }}
                      value={editorType}
                      onChange={(value) => setEditorType(value)}
                      placeholder={t('Email.Field.SelectTypeOfContent')}
                    >
                      <Select.Option value="editor">{t('Email.Field.Editor')}</Select.Option>
                      <Select.Option value="text-field">{t('Email.Field.TextField')}</Select.Option>
                      <Select.Option value="syntax-editor">{t('Email.Field.SyntaxEditor')}</Select.Option>
                    </Select> */}

                    <VariablesSelect onChange={(variable) => handleVariableChange(variable, 'html')} />
                  </Space>
                  <Row>
                    <Col span={24}>
                      <FormItem
                        wrapperCol={{ span: 24 }}
                        name={['translate', 'html']}
                        rules={[{ required: activeTab === '2' }]}
                      >
                        <TextEditor />
                      </FormItem>
                    </Col>
                  </Row>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      </Styles.FormContainer>
    </Styles.MainContainer>
  );
};

export default EmailMessage;
