import { DeleteOutlined } from '@ant-design/icons';
import { AttributeTypeSelect } from '@src/modules/AttributeType';
import { Loader, NameArrayInput, Upload } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { AT_Options } from '../model/attributeOptions.entity';

function AttributeOptionsForm({
  needAT,
  onSubmit,
  onRemove,
  isPending,
  initialValues,
}: FormProps<AT_Options> & { onRemove?: () => void; needAT: boolean }): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <DescriptionInputContainer>
      <Suspense fallback={<Loader />}>
        <Form form={form} name="attribute-options-form" layout={'vertical'} onFinish={onSubmit}>
          <Form.Item required>
            <NameArrayInput inputName="value" />
          </Form.Item>

          <Form.Item label={t('Global.Sort')} name={['sort']} fieldKey={['sort']}>
            <InputNumber placeholder={t('Global.InputPlaceholder', { title: t('Global.Sort') })} />
          </Form.Item>

          <Form.Item name={['file_path']} fieldKey={['file_path']} label={t('Availability.Field.File')}>
            <Upload form={form} />
          </Form.Item>
          <Form.Item hidden name={'file_id'} fieldKey={'file_id'} />

          {needAT && (
            <Suspense fallback={FallbackSelect(t('AttributeOptions.AttributeType'))}>
              <Form.Item name="attributeType" label={t('AttributeOptions.AttributeType')}>
                <AttributeTypeSelect disabled={!!initialValues?.attributeType} />
              </Form.Item>
            </Suspense>
          )}

          <Row justify="end" gutter={[16, 16]}>
            <Col>
              <Button style={{ minWidth: 180 }} type="primary" htmlType="submit" loading={isPending}>
                {t('Global.Submit')}
              </Button>
            </Col>

            {!needAT && (
              <Col>
                <Button ghost danger type="primary" icon={<DeleteOutlined />} onClick={onRemove} />
              </Col>
            )}
          </Row>
        </Form>
      </Suspense>
    </DescriptionInputContainer>
  );
}
export default AttributeOptionsForm;

const DescriptionInputContainer = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  padding: 20px 25px 35px;
  margin-bottom: 40px;
  margin-top: 10px;
`;
