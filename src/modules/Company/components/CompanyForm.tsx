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
import { EditOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { CountrySelect } from '@src/modules/Country';
import { CurrencySelect } from '@src/modules/Currency';
import { ContactGroups } from '@src/modules/User';
import AddressUpsert from '@src/modules/User/containers/AddressUpsert';
import { Accordion, FormSubmit, Upload } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import useModal from '@src/shared/hooks/useModal';
import { ApiBuilder } from '@src/shared/utils';
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, TimePicker, message } from 'antd';
import React, { ReactElement, Suspense, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { CompanyModel } from '../model/company.entity';

export interface Props<T> {
  initialValues?: T;
  isPending: boolean;
  isCreateByPartner?: boolean;
  onSubmit: (data: T) => void;
}
const CompanyForm = ({
  initialValues,
  onSubmit,
  isPending,
  isCreateByPartner,
}: Props<CompanyModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { role } = useParams();

  const [selectedContactGroup, setSelectedContactGroup] = useState<ContactGroups | undefined>(
    initialValues?.contactGroup,
  );

  const contactGroupUpsert = useMemo(() => {
    const apiService = new ApiBuilder('contact-groups', t('Global.ContactGroup'));

    return (
      <AddressUpsert
        // FIXME: Refactor and remove any - have a single contact group model would do the trick
        singleData={selectedContactGroup as any}
        api={async (values) => {
          apiService
            .createOne(values)
            .then(onContactGroupChange)
            .finally(() => {
              setModalVisible(false);
            });
        }}
      />
    );
  }, [initialValues?.contactGroup, selectedContactGroup]);

  const { setVisible: setModalVisible, Modal } = useModal({ content: contactGroupUpsert });

  const onContactGroupChange = useCallback((newContactGroup) => {
    setSelectedContactGroup(newContactGroup);

    const prevFormValues = form.getFieldsValue();
    form.setFieldsValue({ ...prevFormValues, contactGroup: newContactGroup });
  }, []);

  // Contact Group Field "Required" Validator Function
  const isContactGroupEntered = useCallback(async (_, value) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        message.error(t('Company.AddressFieldIsRequired'));

        reject();
      }

      resolve(value);
    });
  }, []);

  const { loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, []);

  return (
    <Form
      form={form}
      name="company-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{
        clubId: 1,
        adminId: 12,
        ChantId:2,
      }}
    >
      <Row gutter={[32, 8]}>
        <Col xs={12}>
          <Form.Item name="Lyric_Sentence" label={"Title"} rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title:"Title" })} />
          </Form.Item>
        </Col>

    
        <Col xs={12}>
          <Form.Item name="startTime_ms" label={"Start Time"} rules={[{ required: true }]}    valuePropName='date'>
          <TimePicker  
           format={"mm:ss"}

              placeholder={"Start Time"}
            />
          </Form.Item>
          
        </Col>

        <Col xs={12}>
          <Form.Item name="duration_ms" label={"Duration ms"} rules={[{ required: true }]}    valuePropName='date'>
          <TimePicker  
           format={"mm:ss"}

              placeholder={"Duration ms"}
            />
          </Form.Item>
        </Col>

     

        <Col xs={12} style={{ alignSelf: 'end' }}>
        <Form.Item name="isActive" valuePropName="checked">
                <Checkbox >{"Is Active"}</Checkbox>
              </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default CompanyForm;

const MainContainer = styled.div`
  border-radius: 4px;

  .accordion-title::before {
    display: inline-block;
    margin-right: 4px;
    color: #ff4d4f;
    font-size: 14px;
    font-family: SimSun, sans-serif;
    line-height: 1;
    content: '*';
  }

  .accordion-details {
    padding: 16px;
    min-height: 150px;
    background: #fbfbfb;
  }
`;

const AccordionEditIcon = styled.div`
  margin-right: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    border: 1px solid #326d94;
  }
`;
