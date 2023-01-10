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
import { ColorPicker, FormSubmit, IconPack, NameArrayInput, Upload } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select, TimePicker } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import FlagModule from '../Flag.module';
import { Flag } from '../model/flag.entity';

export default function FlagForm({ onSubmit, isPending, initialValues }: FormProps<Flag>): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const flagModule = new FlagModule();

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
      name="flag-form"
      initialValues={{  }}
    >
      <Row gutter={[16, 0]}>
        
      
      <Col xs={12}>
          <Form.Item name="title" label={"Title" } rules={[{ required: true }]}>
            <Input placeholder={"Title" } />
          </Form.Item>
        </Col>

    
        <Col xs={12}>
          <Form.Item name="startTime_ms" label={"Start Time ms" } rules={[{ required: true }]}    valuePropName='date'>
          <TimePicker  
           format={"mm:ss"}

              placeholder={"Start Time"}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item name="duration_ms" label={"Duration_ms" } rules={[{ required: true }]}    valuePropName='date'>
          <TimePicker  
           format={"mm:ss"}

              placeholder={"Duration_ms"}
            />
          </Form.Item>
        </Col>
        <Col xs={12} style={{ alignSelf: 'end' }}>
        <Form.Item name="isActive" valuePropName="checked">
                <Checkbox >{"Is Active"}</Checkbox>
              </Form.Item>
        </Col>
        <Col xs={12} style={{ alignSelf: 'end' }}>
       <Form.Item name={'file'} fieldKey={'file'} label={t('Availability.Field.File')}>
            <Upload form={form} idName="file_id"/>
          </Form.Item>
          <Form.Item name="file_id" hidden>
                <></>
              </Form.Item>
        </Col>
        
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}

const FlagContainer = styled.div`
  display: flex;
  align-items: center;

  & .icon {
    font-size: 1rem;
    margin-top: 4px;
    margin-right: 8px;
  }
`;
