
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
import { FormSubmit, PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import AttributeTypeModule from '../AttributeType.module';
import { AttributeTypes } from '..';
import { AvailabilitySelect } from '@src/modules/Availability';
import { PriceTypeSelect } from '@src/modules/PriceType';
import { Button, Col, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import queryString from 'query-string';

export default function AttributeTypePage(): ReactElement {

  const { t } = useTranslation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {search } = useLocation();
   console.log('====================================');
   const params = queryString.parse(search);
   console.log(params);
   console.log('====================================');
   const attributeTypeModule = new AttributeTypeModule(params);
  const onSearch=(value) => {
   console.log(value);
   navigate(
    `?chantId=${value.chantId.id}&eventId=${value.eventId.id}`,
    {search: value},
    { encode: false },
  );
  }
  return (
    <PageLayout<AttributeTypes> module={attributeTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew   element={
          <Form
          form={form}
          layout={'vertical'}
          colon={false}
          name="attributeType-form"
          onFinish={onSearch}
          labelAlign="left"
          labelCol={{ xs: { span: 8 } }}
          initialValues={{ translate: [{ locale: undefined, name: '' }] }}
        >
    <Row style={{width:700}} gutter={16} >

    <Col span={8}>
    
    <Form.Item
    required
          name="chantId"
          label={"Chant ID"}
        >
        <AvailabilitySelect/>
        </Form.Item>
    
        </Col>
        <Col span={8}>
        <Form.Item
        required
          name="eventId"
          label={"Event ID"}
        >
        <PriceTypeSelect/>
        </Form.Item>
      
        </Col>
        <Col span={4}>
        <Form.Item
         label={" "}>
        <Button
          type="primary"
          htmlType="submit"
          data-cy="form-submit-btn"
        >
          {"Search"}
        </Button>

       
      </Form.Item>
      </Col>
      </Row>
      </Form>
    
        }/>
       
        <Panel.ListView module={attributeTypeModule} />
      </PageLayout.Panel>
    </PageLayout>
  );
}
