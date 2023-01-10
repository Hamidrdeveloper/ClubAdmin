import { LoadingOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { CountrySelect } from '@src/modules/Country';
import CustomerStepSelect from '@src/modules/CustomerStep/container/CustomerStepSelect';
import { CustomerStepModel } from '@src/modules/CustomerStep/model/CustomerStep.entity';
import { FlagSelect } from '@src/modules/Flag';
import { LanguageSelect } from '@src/modules/Language';
import { Partner, PartnerSelect } from '@src/modules/Partner';
import { PaymentMethodSelect } from '@src/modules/PaymentMethod';
import { PaymentTermSelect } from '@src/modules/PaymentTerm';
import { RoleSelect } from '@src/modules/Role';
import { roleAtom as allRolesAtom } from '@src/modules/Role/service/roleStore';
import { ShippingMethodSelect } from '@src/modules/ShippingMethod';
import { getSaleSystemSettings } from '@src/modules/ShopSettings/services/saleSystem.service';
import { FormSubmit, InlineSvg, Loader } from '@src/shared/components';
import BirthdayPicker from '@src/shared/components/BirthdayPicker';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, Form, Input, InputNumber, Radio, Row, Select, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAtom } from 'jotai';
import moment from 'moment';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { User } from '../model/personalInfo';
import QuitPartnerModal from './QuitPartnerModal';
import FormStyle from './styles/Form.style';
import Style from './styles/PersonalInfo.style';
import UploadAvatar from './UploadAvatar';
import { DateRenderer } from '.';

interface Props extends FormProps<User> {
  editMode: boolean;
  deActivePending: boolean;
  newOrderPending: boolean;
  twoFactorPending: boolean;
  newSubscriptionPending: boolean;
  newOrderPartnerPending: boolean;

  onNewOrder: () => void;
  onDeactivate?: () => void;
  onNewSubscription: () => void;
  onNewOrderPartner: () => void;

  onProfilePicChange: (id: number | null) => void;
  twoFactorToggleHandler: (val: boolean) => void;
}

interface BriefInfo {
  email: string;
  userName: string;
  location: string;
  fullName: string[];
  careerStep: CareerStepModel;
  joinedOn: null | string | Date;
  customerStep: CustomerStepModel;
}

const PersonalInfoForm = ({
  onSubmit,
  editMode,
  onNewOrder,
  onDeactivate,
  onNewSubscription,
  onNewOrderPartner,
  initialValues,
  newOrderPending,
  deActivePending,
  twoFactorPending,
  newSubscriptionPending,
  newOrderPartnerPending,
  onProfilePicChange,
  twoFactorToggleHandler,
  isPending: submitPending,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const { data: saleSystemSettingsData } = useQuery('saleSystemSetting', getSaleSystemSettings);

  const [briefInfo, setBriefInfo] = useState({} as BriefInfo);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [allRoles] = useAtom(allRolesAtom);
  const { role: roleFromParam } = useParams();

  const { profile, permissions, loggedInUserRole } = useContext(AuthContext);
  const canCreateNewOrder: boolean =
    (permissions?.includes('CreateOrderSale') && permissions?.includes('AdminOrderSale')) ?? false;
  const canCreateOrderSubscription: boolean = permissions?.includes('CreateOrderSubscription') ?? false;
  const canCreateOrderPartner: boolean = permissions?.includes('CreateOrderPartner') ?? false;

  const loggedInAsPartner = profile.roles.map((role) => role.slug).includes('partner');
  const loggedInAsAdmin = loggedInUserRole !== 'partner';

  const [prevSelectedSponsor, setPrevSelectedSponsor] = useState<Partner | undefined>(
    initialValues?.sponsor as Partner,
  );

  const on2FAChange = (ev: CheckboxChangeEvent) => {
    twoFactorToggleHandler(ev.target.checked);
  };

  const onSponsorChangeHandler = (sponsor: Partner) => {
    if (sponsor.id === prevSelectedSponsor?.id) return;
    // Disable alarm confirm when we are creating 'customer' or 'partner'
    if (!editMode) return;

    const isSponsorChangeConfirmed = window.confirm(t('User.Field.AreYouSureYouWantToChangeSponsor'));

    if (isSponsorChangeConfirmed) {
      setPrevSelectedSponsor(sponsor);
      form.setFieldsValue({ sponsor });
    } else {
      form.setFieldsValue({ sponsor: initialValues?.sponsor });
    }
  };

  useEffect(() => {
    if (!initialValues) {
      form.setFieldsValue({ letter_price: saleSystemSettingsData?.communication_by_letter_price });

      return;
    }

    setBriefInfo({
      email: initialValues.email,
      userName: initialValues.username,
      joinedOn: initialValues.created_at,
      location: initialValues.country?.name,
      careerStep: initialValues?.careerStep,
      customerStep: initialValues?.customerStep,
      fullName: [initialValues.person?.first_name, initialValues.person?.last_name],
    });

    const { birth_date, ...restValues } = initialValues;

    const values = {
      ...restValues,
      birth_date: birth_date ? moment(birth_date) : null,
      letter_price: saleSystemSettingsData?.communication_by_letter_price,
    };

    form.setFieldsValue(values);
  }, [initialValues, saleSystemSettingsData]);

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
          discount_ratio: 0,
          is_vat_valid: false,
          use_gln_indocuments: false,
          sponsor: loggedInAsPartner ? { id: profile?.id, user: { person: profile?.person } } : undefined,
          roles: allRoles.filter((role) => role.slug === roleFromParam),
          letter_price: saleSystemSettingsData?.communication_by_letter_price,
        }}
      >
        <Suspense fallback={<Loader />}>
          <Col span={24} className="header">
            <div className="backgroundImg">
              <img src={require('@src/assets/images/user/header.png')} alt="header" />
            </div>
            <div className="avatar">
              <UploadAvatar value={initialValues?.avatar} form={form} onChange={onProfilePicChange} />
              <Form.Item hidden name="file_id">
                <></>
              </Form.Item>
            </div>

            <div className="info">
              <div className="info-item">{briefInfo.fullName?.join(' ') || ' --- --- --- --- --- '}</div>
              {roleFromParam === 'partner' && (
                <div className="info-item">
                  {t('User.Field.CareerStep')}: {briefInfo?.careerStep?.name || '  ---  '}
                </div>
              )}
              {roleFromParam === 'user' && (
                <div className="info-item">
                  {t('User.Field.CustomerStep')}: {briefInfo?.customerStep?.name || ' --- '}
                </div>
              )}
              <div className="info-item custom-svg">
                <InlineSvg width={14} height={14} src={`/global/location-pin.svg`} color="#6e82a5" />
                <span> {briefInfo.location || ' --- --- --- --- '} </span>
              </div>
              <div className="info-item">
                <span>
                  <UserOutlined />
                </span>
                {briefInfo.userName || ' --- --- --- --- '}
              </div>
              <div className="info-item">
                <span>
                  <MailOutlined />
                </span>
                <span>{briefInfo.email || ' --- --- --- --- '}</span>
              </div>
            </div>

            {editMode && (
              <div className="order-btn">
                {canCreateNewOrder && (
                  <Button block onClick={onNewOrder} loading={newOrderPending}>
                    {t('User.PersonalInfo.CreateNewOrder')}
                  </Button>
                )}

                {canCreateOrderSubscription && (
                  <Button
                    block
                    style={{ marginTop: 12 }}
                    onClick={onNewSubscription}
                    loading={newSubscriptionPending}
                  >
                    {t('User.PersonalInfo.CreateNewSubscription')}
                  </Button>
                )}

                {canCreateOrderPartner && (
                  <Button
                    block
                    style={{ marginTop: 12 }}
                    onClick={onNewOrderPartner}
                    loading={newOrderPartnerPending}
                  >
                    {t('User.PersonalInfo.CreateNewOrderPartner')}
                  </Button>
                )}

                {loggedInAsAdmin && initialValues?.partner && !initialValues?.partner?.quit_at && (
                  <Button
                    block
                    style={{ marginTop: 12 }}
                    danger
                    onClick={() => {
                      setModalVisible(true);
                    }}
                  >
                    {t('User.PersonalInfo.QuitPartner')}
                  </Button>
                )}

                {isModalVisible && (
                  <QuitPartnerModal
                    setModalVisible={setModalVisible}
                    partnerId={initialValues?.partner?.id}
                    isModalVisible={isModalVisible}
                  />
                )}
              </div>
            )}

            <div className="joined">
              <span>{t('User.Field.JoinedToCleafinOn')}</span>
              {briefInfo.joinedOn ? DateRenderer(briefInfo.joinedOn) : '--.--.--'}
            </div>
          </Col>

          <Row justify="space-between">
            <Col xs={24} md={12} className="leftCol">
              <Form.Item
                label={t('Global.Username')}
                name="username"
                rules={[{ required: true }]}
                hidden={editMode}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Username') })} />
              </Form.Item>
              <Form.Item
                label={t('User.Field.FirstName')}
                name={['person', 'first_name']}
                rules={[{ required: true }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.FirstName') })} />
              </Form.Item>
              <Form.Item
                label={t('User.Field.LastName')}
                name={['person', 'last_name']}
                rules={[{ required: true }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.LastName') })} />
              </Form.Item>

              <Form.Item label={t('User.Field.Phone')} name={'telephone_number'} rules={[{ required: true }]}>
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.Phone') })} />
              </Form.Item>

              <BirthdayPicker label={t('User.PersonalInfo.BirthDate')} isRequired />

              <Form.Item
                label={t('User.Field.Gender')}
                name={['person', 'gender']}
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

              {(loggedInAsAdmin || !editMode) && (
                <Form.Item
                  label={t('Global.Email')}
                  name={'email'}
                  rules={[{ required: true, type: 'email', message: `${t('User.PersonalInfo.EmailWrong')}` }]}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Email') })} />
                </Form.Item>
              )}

              <Form.Item label={t('User.Field.CompanyName')} name={['person', 'company_name']}>
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.CompanyName') })} />
              </Form.Item>
              <Form.Item label={t('User.Field.Country')} name="country" rules={[{ required: true }]}>
                <CountrySelect menuPlacement="top" />
              </Form.Item>
              {!loggedInAsPartner && (
                <Form.Item label={t('User.PersonalInfo.Flag')} name="flag">
                  <FlagSelect />
                </Form.Item>
              )}
              <Form.Item label={t('User.Field.LanguageId')} name="language" rules={[{ required: true }]}>
                <LanguageSelect menuPlacement="top" />
              </Form.Item>

              {editMode && !loggedInAsPartner && (
                <Form.Item label={t('User.Field.Roles')} name="roles">
                  <RoleSelect
                    isClearable={false}
                    menuPlacement="top"
                    disabled={loggedInAsPartner || editMode}
                  />
                </Form.Item>
              )}
              {/* NOTE: END of Col 1 */}
            </Col>

            <Col xs={24} md={12} className="rightCol">
              {roleFromParam === 'user' && (
                <Form.Item label={t('User.Field.CustomerStep')} name="customerStep">
                  <CustomerStepSelect />
                </Form.Item>
              )}
              <Form.Item
                name="sponsor"
                label={t('User.PersonalInfo.SponsorID')}
                rules={[{ required: roleFromParam === 'user' || !editMode }]}
              >
                <PartnerSelect
                  onChange={onSponsorChangeHandler}
                  disabled={
                    // if we are editing partner form and logged in as Partner disable this field
                    (roleFromParam === 'partner' ? editMode && loggedInAsPartner : undefined) ||
                    // if it is logged in as partner cant change any user's sponsor
                    loggedInAsPartner
                  }
                />
              </Form.Item>

              {!editMode && (
                <Form.Item label={t('User.Field.Roles')} name="roles">
                  <RoleSelect isClearable={false} menuPlacement="top" disabled={loggedInAsPartner} />
                </Form.Item>
              )}

              <Form.Item label={t('User.Field.TaxNumber')} name="tax_number">
                <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.TaxNumber') })} />
              </Form.Item>

              <Form.Item label={t('User.Field.VatNumber')} name="vat_number">
                <Input
                  min={0}
                  style={{ display: 'flex' }}
                  placeholder={t('Global.InputPlaceholder', { title: t('User.Field.VatNumber') })}
                  addonBefore={
                    <Form.Item name="is_vat_valid" valuePropName="checked" noStyle>
                      <Checkbox disabled={loggedInAsPartner}>{t('User.Field.IsValid')}</Checkbox>
                    </Form.Item>
                  }
                />
              </Form.Item>

              {roleFromParam !== 'user' && (
                <Form.Item label={t('User.Field.EoriNumber')} name="eori_number">
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.EoriNumber') })} />
                </Form.Item>
              )}

              {!loggedInAsPartner && (
                <>
                  <Form.Item label={t('User.PersonalInfo.PaymentMethod')} name="paymentMethod">
                    <PaymentMethodSelect />
                  </Form.Item>

                  <Tooltip title={t('User.Field.MaximumCreditLimitLengthIsSix')}>
                    <Form.Item label={t('User.Field.CreditLimit')} name="credit_limit">
                      <InputNumber
                        maxLength={6}
                        placeholder={t('Global.InputPlaceholder', { title: t('User.Field.CreditLimit') })}
                      />
                    </Form.Item>
                  </Tooltip>

                  <Form.Item label={t('User.Field.DefaultShippingMethod')} name="shippingMethod">
                    <ShippingMethodSelect isClearable />
                  </Form.Item>

                  <Form.Item label={t('User.Field.DefaultPaymentTerms')} name="paymentTerm">
                    <PaymentTermSelect menuPlacement="top" />
                  </Form.Item>
                </>
              )}

              {roleFromParam !== 'partner' && (
                <Form.Item
                  label={t('User.Field.UserDiscount')}
                  name={'discount_ratio'}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="0">0</Select.Option>
                    <Select.Option value="5">5 %</Select.Option>
                    <Select.Option value="10">10 %</Select.Option>
                    <Select.Option value="15">15 %</Select.Option>
                    <Select.Option value="20">20 %</Select.Option>
                  </Select>
                </Form.Item>
              )}

              {!loggedInAsPartner && (
                <Form.Item name="letter_price" label={t('User.Field.CommunicationByLetter')}>
                  <InputNumber
                    min={0}
                    disabled
                    style={{ display: 'flex' }}
                    addonBefore={
                      <Form.Item name="communication_by_letter" valuePropName="checked" noStyle>
                        <Checkbox />
                      </Form.Item>
                    }
                    placeholder={t('User.PersonalInfo.SetPriceInWebsiteSettings')}
                  />
                </Form.Item>
              )}

              <Row wrap={true} className="checkbox-container">
                {!loggedInAsPartner && (
                  <Col xs={24} sm={12}>
                    <Form.Item name="use_gln_indocuments" valuePropName="checked">
                      <Checkbox>{t('User.Field.UseGlnInDocuments')}</Checkbox>
                    </Form.Item>
                  </Col>
                )}

                <Col xs={24} sm={!loggedInAsPartner ? 12 : 24}>
                  <Form.Item name="two_factor_enable" valuePropName="checked">
                    {twoFactorPending ? (
                      <LoadingOutlined />
                    ) : (
                      <Checkbox disabled={!editMode} onChange={on2FAChange}>
                        {!editMode ? (
                          <Tooltip
                            title={t('User.Field.CantActivateTwoFactorAuthenticationWhileCreating', {
                              title: roleFromParam ?? '',
                            })}
                          >
                            {t('User.Field.TwoFactorEnabled')}
                          </Tooltip>
                        ) : (
                          <>{t('User.Field.TwoFactorEnabled')}</>
                        )}
                      </Checkbox>
                    )}
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
              editMode ? (
                initialValues?.is_active ? (
                  <Button onClick={onDeactivate} danger loading={deActivePending} disabled={submitPending}>
                    {t('User.PersonalInfo.DeActiveAccount')}
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
    </Style.MainContainer>
  );
};

export default PersonalInfoForm;
