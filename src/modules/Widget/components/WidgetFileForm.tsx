import { DeleteOutlined } from '@ant-design/icons';
import { TextEditor, Upload } from '@src/shared/components';
import DeletePrompt from '@src/shared/components/DeletePrompt';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { WidgetFile } from '../model/widget.entity';

export default function WidgetFileForm({
  onSubmit,
  onRemove,
  isPending,
  initialValues,
}: FormProps<WidgetFile> & { onRemove: () => void }): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        translate:
          initialValues.translate.length > 0
            ? initialValues.translate
            : [{ locale: undefined, title: '', content: '' }],
      });
    }
  }, [initialValues]);

  return (
    <DescriptionInputContainer>
      <Form form={form} layout={'vertical'} name="settings-form" onFinish={onSubmit}>
        <Row gutter={16}>
          <Col span={8} className="upload-container">
            <Form.Item label={t('Widget.Image')} name="file_path">
              <Upload form={form} type="dragger" idName="file_id" />
            </Form.Item>
            <Form.Item hidden name="file_id">
              <></>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <Form.Item
                  label={t('Widget.Link')}
                  rules={[
                    { required: true },
                    {
                      type: 'url',
                      message: t('Widget.ValidUrl'),
                    },
                  ]}
                  name={['translate', 0, 'title']}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: 'Link' })} />
                </Form.Item>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <Form.Item name={['translate', 0, 'content']} label={t('Global.Description')}>
                  <TextEditor height={200} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <Row justify="end" gutter={[16, 16]}>
          <Col>
            <Button style={{ minWidth: 180 }} type="primary" htmlType="submit" loading={isPending}>
              {t('Global.Submit')}
            </Button>
          </Col>

          <Col>
            <DeletePrompt onConfirm={onRemove}>
              <Button ghost danger type="primary" icon={<DeleteOutlined />} />
            </DeletePrompt>
          </Col>
        </Row>
      </Form>
    </DescriptionInputContainer>
  );
}

const DescriptionInputContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;

  .upload-container {
    & img {
      height: 294px !important;
    }
  }
`;
