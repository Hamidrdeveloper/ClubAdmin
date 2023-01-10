import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CountrySelect } from '@src/modules/Country';
import { FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Divider, Form, Input, Row, Select, Space } from 'antd';
import React, { ChangeEvent, Fragment, ReactElement, Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Address } from '../model/address';
import Styles from './styles/Address.style';

const AddressForm = ({ onSubmit, isPending, initialValues }: FormProps<Address>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

  useEffect(() => {
    if (!initialValues) return;

    const initialValueAddressTitle = initialValues?.title;

    const isAlreadyExist = options.some((option) => option.value === initialValueAddressTitle);
    if (!isAlreadyExist)
      setOptions((prev) => [
        ...prev,
        { label: initialValueAddressTitle, value: initialValueAddressTitle?.toLowerCase() },
      ]);

    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const [newTitle, setNewTitle] = useState('');

  const [options, setOptions] = useState([
    { label: t('Global.Standard'), value: 'standard' },
    { label: t('Global.Home'), value: 'home' },
    { label: t('User.Address.Field.Office'), value: 'office' },
    { label: t('Global.Other'), value: 'other' },
  ]);

  const selectInputRef = useRef<Input>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormAsDirty();

    setNewTitle(e.target.value);
  };

  const handleAddItem = () => {
    if (newTitle.length === 0) return;
    setFormAsDirty();

    const newTitleValue = newTitle.toLowerCase();
    const isAlreadyExist = options.some((option) => option.value === newTitleValue);

    if (!isAlreadyExist) {
      setOptions((prev) => [...prev, { label: newTitle, value: newTitleValue }]);
    }

    form.setFieldsValue({ title: newTitleValue });
    setNewTitle('');
  };

  const handleSelectFocus = () => {
    if (selectInputRef.current) {
      selectInputRef.current.focus();
    }
  };

  const setFormAsDirty = () => {
    setIsFormDirty(true);
  };

  return (
    <Styles.MainContainer radius={10}>
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        name="user-address-form"
        onChange={setFormAsDirty}
        scrollToFirstError
      >
        <Suspense fallback={<Loader />}>
          <Styles.FieldSet>
            {/* TODO: Add Icons (accessibility) */}
            <legend>{t('User.Address.Title').toUpperCase()}</legend>

            <Form.Item label={t('User.Address.TitleOfDataSet')} name="title" rules={[{ required: true }]}>
              <Select
                onChange={setFormAsDirty}
                onClick={handleSelectFocus}
                placeholder={t('Global.SelectPlaceholder', { title: t('User.Address.TitleOfDataSet') })}
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8, gap: 8 }}>
                      <Input
                        ref={selectInputRef}
                        size="small"
                        value={newTitle}
                        style={{ flex: 'auto' }}
                        onPressEnter={handleAddItem}
                        onChange={handleTitleChange}
                        placeholder={t('Global.InputPlaceholder', {
                          title: t('User.Address.TitleOfDataSet'),
                        })}
                      />

                      <Button
                        type="primary"
                        onClick={handleAddItem}
                        style={{ flex: 'none', display: 'block', cursor: 'pointer' }}
                      >
                        <PlusOutlined /> {t('Global.Add')}
                      </Button>
                    </div>
                  </div>
                )}
              >
                {options.map((item, index) => (
                  <Select.Option value={item.value} key={`option-${index}`}>
                    {item.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Row gutter={32}>
              <Col xs={24}>
                <Form.Item label={t('User.Address.AddressLine')} name={['address', 'address1']}>
                  <Input.TextArea />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('Global.FirstName')} name={'first_name'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('Global.LastName')} name={'last_name'} rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('Global.Gender')} name={'gender'}>
                  <Select
                    options={[
                      {
                        label: t('Global.Male'),
                        value: 'male',
                      },
                      {
                        label: t('Global.Female'),
                        value: 'female',
                      },
                      {
                        label: t`Global.None`,
                        value: 'none',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('User.Address.CompanyName')} name={'company_name'}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('User.Address.Field.Street')} name={['address', 'address2']}>
                  <Input
                    placeholder={t('Global.InputPlaceholder', { title: t`User.Address.Field.Street` })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  name={['address', 'house_number']}
                  rules={[{ required: true }]}
                  label={t('User.Address.Field.HouseNumber')}
                >
                  <Input
                    placeholder={t('Global.InputPlaceholder', { title: t`User.Address.Field.HouseNumber` })}
                  />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  label={t('User.Field.PostalCode')}
                  rules={[{ required: true }]}
                  name={['address', 'postal_code']}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.PostalCode') })} />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item
                  label={t('User.Field.City')}
                  name={['address', 'city']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.City') })} />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('User.Field.State')} name={['address', 'state']}>
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('User.Field.State') })} />
                </Form.Item>
              </Col>

              <Col xs={24} lg={12}>
                <Form.Item label={t('User.Field.Country')} name="country" rules={[{ required: true }]}>
                  <CountrySelect />
                </Form.Item>
              </Col>
            </Row>
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('Global.Email').toUpperCase()}</legend>
            <Form.List name="emails">
              {(fields, { add, remove }) => (
                <>
                  {fields.length === 0 ? (
                    <Button block type="dashed" onClick={() => add()}>
                      {t('User.Address.Field.CreateNewEmail')}
                    </Button>
                  ) : (
                    fields.map(({ name, key, fieldKey, ...restField }, index) => (
                      <Fragment key={key}>
                        <div className="space" key={key}>
                          <Input.Group className="gap">
                            <Form.Item
                              {...restField}
                              noStyle
                              name={[name, 'email']}
                              fieldKey={[fieldKey, 'email']}
                            >
                              <Input type="email" />
                            </Form.Item>
                          </Input.Group>

                          <Space>
                            {index === 0 && (
                              <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                            )}
                            <Button
                              ghost
                              type="primary"
                              icon={<MinusOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        </div>
                        {index !== fields.length - 1 && <Divider />}
                      </Fragment>
                    ))
                  )}
                </>
              )}
            </Form.List>
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{t('User.Address.Website').toUpperCase()}</legend>
            <Form.List name="websites">
              {(fields, { add, remove }) => (
                <>
                  {fields.length === 0 ? (
                    <Button block type="dashed" onClick={() => add()}>
                      {t('User.Address.Field.CreateNewWebsite')}
                    </Button>
                  ) : (
                    fields.map(({ name, key, fieldKey, ...restField }, index) => (
                      <Fragment key={key}>
                        <div className="space">
                          <Input.Group className="gap">
                            <Form.Item {...restField} noStyle name={[name, 'type']} fieldKey={[name, 'id']}>
                              <Select
                                style={{ minWidth: 150 }}
                                options={[
                                  { label: t('User.Field.Website'), value: 'website' },
                                  {
                                    value: 'facebook',
                                    label: t('User.Field.Facebook'),
                                  },
                                  {
                                    value: 'twitter',
                                    label: t('User.Field.Twitter'),
                                  },
                                  {
                                    value: 'linkedin',
                                    label: t('User.Field.Linkedin'),
                                  },
                                ]}
                                placeholder={`Select ${t('User.Field.Website')}`}
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              noStyle
                              name={[name, 'url']}
                              fieldKey={[fieldKey, 'url']}
                            >
                              <Input />
                            </Form.Item>
                          </Input.Group>

                          <Space>
                            {index === 0 && (
                              <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                            )}
                            <Button
                              ghost
                              type="primary"
                              icon={<MinusOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        </div>
                        {index !== fields.length - 1 && <Divider />}
                      </Fragment>
                    ))
                  )}
                </>
              )}
            </Form.List>
          </Styles.FieldSet>

          <Styles.FieldSet>
            <legend>{'Phone'.toUpperCase()}</legend>
            <Form.List name="phones">
              {(fields, { add, remove }) => (
                <>
                  {fields.length === 0 ? (
                    <Button block type="dashed" onClick={() => add()}>
                      {t('User.Address.Field.CreateNewPhone')}
                    </Button>
                  ) : (
                    fields.map(({ name, key, fieldKey, ...restField }, index) => (
                      <Fragment key={key}>
                        <div className="space">
                          <Input.Group className="gap">
                            <Form.Item {...restField} noStyle name={[name, 'type']} fieldKey={[name, 'id']}>
                              <Select
                                style={{ minWidth: 150 }}
                                options={[
                                  { label: 'Fax', value: 'fax' },
                                  { label: 'Phone', value: 'phone' },
                                  { label: 'Mobile', value: 'mobile' },
                                ]}
                                placeholder="Select Phone"
                              />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              noStyle
                              name={[name, 'number']}
                              fieldKey={[fieldKey, 'number']}
                            >
                              <Input />
                            </Form.Item>
                          </Input.Group>

                          <Space>
                            {index === 0 && (
                              <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                            )}
                            <Button
                              ghost
                              type="primary"
                              icon={<MinusOutlined />}
                              onClick={() => remove(name)}
                            />
                          </Space>
                        </div>
                        {index !== fields.length - 1 && <Divider />}
                      </Fragment>
                    ))
                  )}
                </>
              )}
            </Form.List>
          </Styles.FieldSet>

          <FormSubmit disabledPrimary={!isFormDirty} isPending={isPending} />
        </Suspense>
      </Form>
    </Styles.MainContainer>
  );
};

export default AddressForm;
