/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { LoginOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { FlagSelect } from '@src/modules/Flag';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { PaymentTermSelect } from '@src/modules/PaymentTerm';
import { Role, RoleSelect } from '@src/modules/Role';
import { ShippingMethodSelect } from '@src/modules/ShippingMethod';
import { FormSubmit, InlineSvg, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, Form, Input, Radio, Row, Typography } from 'antd';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryObserverResult } from 'react-query';

import DeActiveUserModal from './DeActiveUserModal';
import Style from './styles/CompanyInfo.style';
import FormStyle from './styles/Form.style';
import { Supplier } from '..';

interface Props extends FormProps<Supplier> {
  editMode: boolean;
  flagPending: boolean;
  rolePending: boolean;
  deActivePending: boolean;
  onDeactivate?: () => void;
  flagChangeHandler: (flag: Flag) => void;
  roleChangeHandler: (roles: Role[]) => void;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
}

interface BriefInfo {
  email: string;
  location: string;
  username: string;
  fullName: string[];
  isUser: boolean;
}

const CompanyInfoForm = ({
  onSubmit,
  editMode,
  refetch,
  flagPending,
  rolePending,
  onDeactivate,
  initialValues,
  deActivePending,
  flagChangeHandler,
  roleChangeHandler,
  isPending: submitPending,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [briefInfo, setBriefInfo] = useState({} as Partial<BriefInfo>);

  const [isUser, setIsUser] = useState(initialValues?.is_user);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!initialValues) return;
    setIsUser(initialValues.is_user);
    setBriefInfo({
      email: initialValues.user?.email,
      location: initialValues?.contactGroup?.country?.name,
      username: initialValues?.is_user ? initialValues.people.user.username : undefined,
      fullName: [initialValues.people?.first_name, initialValues.people?.last_name],
      isUser: initialValues?.is_user,
    });

    form.setFieldsValue({ ...initialValues, flags: initialValues.flags?.[0] });
  }, [initialValues]);

  return (
    <Style.MainContainer radius={5}>
      <FormStyle.Container
        form={form}
        colon={false}
        colspace={8}
        name="user-form"
        onFinish={onSubmit}
        labelAlign={'left'}
        labelCol={{ xs: { span: 8 } }}
        wrapperCol={{ xs: { span: 16 } }}
        layout={'horizontal'}
        initialValues={{
          is_vat_valid: false,
          discount_ratio: 0,
          use_gln_indocuments: false,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Col span={24} className="header">
            <div className="backgroundImg">
              <img src={require('@src/assets/images/user/header.png')} alt="header" />
            </div>

            <div className="info">
              <div className="info-item">{briefInfo.fullName?.join(' ') || ' --- --- --- --- --- '}</div>
              <div className="info-item custom-svg">
                <InlineSvg width={14} height={14} src={`/global/location-pin.svg`} color="#6e82a5" />
                <span> {briefInfo.location || ' --- --- --- --- '} </span>
              </div>
              {isUser && (
                <div className="info-item">
                  <span>
                    <UserOutlined />
                  </span>
                  {briefInfo.username || ' --- --- --- --- '}
                </div>
              )}
              <div className="info-item">
                <span>
                  <MailOutlined />
                </span>
                <span>{briefInfo.email || ' --- --- --- --- '}</span>
              </div>
              {editMode && (
                <div className="info-item">
                  <span>
                    <LoginOutlined />
                  </span>
                  {briefInfo?.isUser ? (
                    <>
                      <Typography.Text type="success">
                        {t('Supplier.CompanyInfo.CanLoginToSystem')}
                      </Typography.Text>
                    </>
                  ) : (
                    <Typography.Text type="danger">
                      {t('Supplier.CompanyInfo.CanNotLoginToSystem')}
                    </Typography.Text>
                  )}
                </div>
              )}
            </div>
          </Col>

          <Row justify="space-between">
            <Col xs={24} md={12} className="leftCol">
              {/* you can create a supplier user only when its not already a user  */}
              {/* If its already a user you can activate and deactivate it */}
              <Form.Item
                label={t('Global.Username')}
                name={['user', 'username']}
                hidden={isUser || (editMode && !isUser && initialValues?.user !== null)}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Username') })} />
              </Form.Item>
              <Form.Item
                hidden={isUser || (editMode && !isUser && initialValues?.user !== null)}
                name={['user', 'password']}
                label={t('Global.Password')}
                rules={[{ min: 8, message: 'Password should at least have 8 Characters' }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Password') })} />
              </Form.Item>
              <Form.Item
                label={t('Global.Email')}
                name={['user', 'email']}
                hidden={isUser || (editMode && !isUser && initialValues?.user !== null)}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Email') })} />
              </Form.Item>

              <Form.Item
                label={t('User.Field.Phone')}
                name={['user', 'telephone_number']}
                hidden={isUser || (editMode && !isUser && initialValues?.user !== null)}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.Phone') })} />
              </Form.Item>

              <Form.Item
                label={t('User.Field.FirstName')}
                name={['people', 'first_name']}
                rules={[{ required: true }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.FirstName') })} />
              </Form.Item>

              <Form.Item
                label={t('User.Field.LastName')}
                name={['people', 'last_name']}
                rules={[{ required: true }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.LastName') })} />
              </Form.Item>

              <Form.Item
                label={t('User.Field.Gender')}
                name={['people', 'gender']}
                rules={[{ required: true }]}
              >
                <Radio.Group
                  options={[
                    { label: t('User.Field.Male'), value: 'male' },
                    { label: t('User.Field.Female'), value: 'female' },
                    { label: t('User.Field.Other'), value: 'none' },
                  ]}
                />
              </Form.Item>

              <Form.Item label={t('User.Field.CompanyName')} name={['people', 'company_name']}>
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.CompanyName') })} />
              </Form.Item>

              {/* Cause we can only sync flags if it has supplierId */}
              {editMode && (
                <Form.Item label={t('User.PersonalInfo.Flag')} name="flags">
                  <FlagSelect onChange={flagChangeHandler} isPending={flagPending} />
                </Form.Item>
              )}

              {/* in create mode all suppliers are NOT users */}
              {/* we sync roles via UserId so if the supplier is a user we can select it */}
              {editMode && isUser && (
                <Form.Item label={t('User.Field.Roles')} name={['people', 'user', 'roles']}>
                  <RoleSelect
                    isMulti
                    menuPlacement="top"
                    isClearable={false}
                    isPending={rolePending}
                    onChange={roleChangeHandler}
                  />
                </Form.Item>
              )}

              <Form.Item label={t('User.Field.TaxNumber')} name="tax_number">
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.TaxNumber') })} />
              </Form.Item>

              {/* NOTE: END of Col 1 */}
            </Col>

            <Col xs={24} md={12} className="rightCol">
              <Form.Item label={t('User.Field.VatNumber')} name="vat_number">
                <Input
                  min={0}
                  style={{ display: 'flex' }}
                  placeholder={t('Global.InputPlaceholder', { title: t('Supplier.Field.VatNumber') })}
                  addonBefore={
                    <Form.Item name="is_vat_valid" valuePropName="checked" noStyle>
                      <Checkbox>{t('Supplier.Field.IsValid')}</Checkbox>
                    </Form.Item>
                  }
                />
              </Form.Item>

              <Form.Item label={t('User.Field.EoriNumber')} name="eori_number">
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.EoriNumber') })} />
              </Form.Item>

              <Form.Item label={t('User.Field.CreditLimit')} name="credit_limit">
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.CreditLimit') })} />
              </Form.Item>

              <Form.Item
                label={t('User.Field.DefaultShippingMethod')}
                name="shippingMethod"
                rules={[{ required: true }]}
              >
                <ShippingMethodSelect />
              </Form.Item>

              <Form.Item
                label={t('User.Field.DefaultPaymentTerms')}
                name="paymentTerm"
                rules={[{ required: true }]}
              >
                <PaymentTermSelect menuPlacement="top" />
              </Form.Item>

              <Row wrap={true} className="checkbox-container">
                <Col xs={24} sm={12}>
                  <Form.Item name="communication_by_letter" valuePropName="checked" className="whiteBg">
                    <Checkbox>{t('Supplier.CompanyInfo.CommunicationByLetter')}</Checkbox>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12}>
                  <Form.Item name="use_gln_indocuments" valuePropName="checked" className="whiteBg">
                    <Checkbox>{t('User.Field.UseGlnInDocuments')}</Checkbox>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>

          <FormSubmit
            isPending={submitPending}
            title={editMode ? t('Global.Save') : t('Global.Create')}
            disabledPrimary={deActivePending}
            Secondary={
              editMode && isUser ? (
                initialValues?.people?.user?.is_active ? (
                  <Button onClick={() => setModalVisible(true)} danger>
                    {' '}
                    {t('Supplier.CompanyInfo.DeActiveAccount')}
                  </Button>
                ) : (
                  <Button onClick={onDeactivate} loading={deActivePending} disabled={submitPending}>
                    {t('User.PersonalInfo.ActivateAccount')}
                  </Button>
                )
              ) : (
                ''
              )
            }
          />
        </Suspense>
      </FormStyle.Container>
      {isModalVisible && (
        <DeActiveUserModal
          userId={initialValues?.user?.id}
          userStatus={initialValues?.user?.is_active}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          refetch={refetch}
        />
      )}
    </Style.MainContainer>
  );
};

export default CompanyInfoForm;
