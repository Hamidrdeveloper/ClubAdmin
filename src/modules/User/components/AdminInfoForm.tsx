import { LoadingOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { FlagSelect } from '@src/modules/Flag';
import { LanguageSelect } from '@src/modules/Language';
import { RoleSelect } from '@src/modules/Role';
import { roleAtom as allRolesAtom } from '@src/modules/Role/service/roleStore';
import { FormSubmit, Loader } from '@src/shared/components';
import BirthdayPicker from '@src/shared/components/BirthdayPicker';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, Form, Input, Radio, Row, Tooltip } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useAtom } from 'jotai';
import moment from 'moment';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { User } from '../model/personalInfo';
import FormStyle from './styles/Form.style';
import Style from './styles/PersonalInfo.style';
import UploadAvatar from './UploadAvatar';
import { DateRenderer } from '.';

interface Props extends FormProps<User> {
  editMode: boolean;
  deActivePending: boolean;
  newOrderPending: boolean;
  twoFactorPending: boolean;

  onNewOrder: () => void;
  onDeactivate?: () => void;
  twoFactorToggleHandler: (val: boolean) => void;
  onProfilePicChange: (id: number | null) => void;
}

interface BriefInfo {
  email: string;
  userName: string;
  fullName: string[];
  joinedOn: null | string | Date;
}

const AdminInfoForm = ({
  onSubmit,
  editMode,
  onDeactivate,
  initialValues,
  deActivePending,
  twoFactorPending,
  onProfilePicChange,
  twoFactorToggleHandler,
  isPending: submitPending,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [briefInfo, setBriefInfo] = useState({} as BriefInfo);
  const [allRoles] = useAtom(allRolesAtom);
  const { role: roleFromParam } = useParams();
  const { loggedInUserRole } = useContext(AuthContext);

  const loggedInAsAdmin = loggedInUserRole !== 'partner';

  const on2FAChange = (ev: CheckboxChangeEvent) => {
    twoFactorToggleHandler(ev.target.checked);
  };

  useEffect(() => {
    if (initialValues) {
      setBriefInfo({
        email: initialValues.email,
        userName: initialValues.username,
        joinedOn: initialValues.created_at,
        fullName: [initialValues.person?.first_name, initialValues.person?.last_name],
      });

      const { birth_date, ...restValues } = initialValues;

      const values = {
        ...restValues,
        birth_date: birth_date ? moment(birth_date) : null,
      };

      form.setFieldsValue(values);
    }
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
          roles: allRoles.filter((role) => role.slug === roleFromParam),
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

              {/* NOTE: END of Col 1 */}
            </Col>

            <Col xs={24} md={12} className="rightCol">
              {loggedInAsAdmin && (
                <Form.Item label={t('Global.Email')} name={'email'} rules={[{ required: true }]}>
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Email') })} />
                </Form.Item>
              )}

              <Form.Item label={t('User.PersonalInfo.Flag')} name="flag">
                <FlagSelect />
              </Form.Item>

              <Form.Item label={t('User.Field.LanguageId')} name="language" rules={[{ required: true }]}>
                <LanguageSelect menuPlacement="top" />
              </Form.Item>

              <Form.Item label={t('User.Field.Roles')} name="roles">
                <RoleSelect disabled={editMode} isClearable={false} menuPlacement="top" />
              </Form.Item>

              <Row wrap={true} className="checkbox-container">
                <Col xs={24}>
                  <Form.Item name="two_factor_enable" valuePropName="checked">
                    {twoFactorPending ? (
                      <LoadingOutlined />
                    ) : (
                      <Checkbox disabled={!editMode} onChange={on2FAChange}>
                        {!editMode ? (
                          <Tooltip
                            title={t('User.Field.CantActivateTwoFactorAuthenticationWhileCreating', {
                              title: t('User.Field.Admin'),
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

export default AdminInfoForm;
