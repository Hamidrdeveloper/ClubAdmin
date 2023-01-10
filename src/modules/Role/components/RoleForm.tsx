/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { FormSubmit, Loader, NameArrayInput, Upload } from '@shared/components';
import { permissionAtom } from '@src/modules/Permission/service/permissionStore';
import { Checkbox, Col, Form, Input, Row, Space, Transfer } from 'antd';
import React, { KeyboardEvent, ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Role } from '../model/role.entity';
import { PriceType } from '@src/modules/PriceType';
import TextArea from 'antd/lib/input/TextArea';


export default function RoleForm({ onSubmit, isPending, initialValues }: FormProps<PriceType>): ReactElement {
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
      layout={'vertical'}
      name="price-type-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      onFinish={onSubmit}
    >
      <Suspense fallback={<Loader />}>
      <Row gutter={[16, 0]}>

<Col xs={12}>
  <Form.Item
    label={"isAccept"}
    name="isAccept"

    valuePropName="checked"
  >

            <Checkbox>{"isAccept"}</Checkbox>
    

  </Form.Item>
</Col>
<Col xs={12}>
  <Form.Item
    label={"isRemoved"}
    name="isRemoved"
   
    valuePropName="checked"
  >
   

  <Checkbox>{"isRemoved"}</Checkbox>
    
  </Form.Item>
</Col>

</Row>
       

       

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
