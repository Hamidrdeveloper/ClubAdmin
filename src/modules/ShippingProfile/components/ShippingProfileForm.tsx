/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { FormSubmit, Loader, TextEditor, Upload } from '@shared/components';
import { CountrySelect } from '@src/modules/Country';
import { PartnerSelect } from '@src/modules/Partner';
import AsyncSubdomainSelect from '@src/modules/Subdomain/containers/AsyncSubdomainSelect';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import OnbordingArrayInput from '@src/shared/components/OnbordingArray/OnbordingArrayInput';

import { ShippingProfile } from '../model/shippingProfile.entity';
import ShippingProfileModule from '../ShippingProfile.module';

export default function ShippingProfileForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<ShippingProfile>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const module = new ShippingProfileModule();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const getFile = (e) => {
    console.log('Upload event:', e);
  
    if (Array.isArray(e)) {
      return e;
    }
   return e && e.fileList;
  };
  
  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="shipping-profile-form"
      initialValues={}
    >
      <Suspense fallback={<Loader />}>
     
    
      <Row gutter={[16, 0]}>
              
              <Col span={12}>
              
          <Form.Item  name={"title"} label={"Title"}  rules={[{ required: true }]}>
            <Input placeholder={"Title"} />
          </Form.Item>
         
          <Form.Item name={"file"} label={t('Availability.Field.File')}  rules={[{ required: true }]}>
            <Upload pathName="file" type={'normal'} form={form} valueName="file" idName="file" key={'file'} />
          </Form.Item>

       
        
        </Col>
        <Col xs={12}>
                  <Form.Item
                    rules={[{ required: true }]}
                    labelCol={{ span: 24 }}
                    label={t('Global.Description')}
                    name={"description"}
                    fieldKey={"description"}
                    
                  >
                    
                      <Input.TextArea
                        rows={5}
                        
                        placeholder={t('Global.InputPlaceholder', { title: t('Global.Description') })}
                      />
                 
                  </Form.Item>
               
                </Col>
                
      </Row>
    
      

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
