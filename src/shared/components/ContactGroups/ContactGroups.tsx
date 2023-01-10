import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { CountrySelect } from '@modules/Country';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import React, { ReactElement } from 'react';

import Styles from './ContactGroups.style';
import TitleDivider from './TitleDivider';

export default function ContactGroup(): ReactElement {
  return (
    <>
      <TitleDivider title={'Contact Group'.toUpperCase()} />

      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item
            label={'Address Name'}
            rules={[{ required: true }]}
            name={['contactGroups', 'translate', 0, 'title']}
          >
            <Input />
          </Form.Item>

          <Form.Item hidden name={['contactGroups', 'translate', 0, 'locale']} initialValue="de">
            <></>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={'Country'} name={['contactGroups', 'country']} rules={[{ required: true }]}>
            <CountrySelect />
          </Form.Item>
        </Col>
      </Row>

      <Styles.FieldSet>
        <legend>{'Phone'.toUpperCase()}</legend>
        <Form.Item label={'Phone'}>
          <Form.List name={['contactGroups', 'phones']}>
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? (
                  <Button block type="dashed" onClick={() => add()}>
                    Create New Phone
                  </Button>
                ) : (
                  fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div className="space" key={key}>
                      <Input.Group className="gap">
                        <Form.Item {...restField} noStyle name={[name, 'type']} fieldKey={[fieldKey, 'type']}>
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
                        <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />

                        <Button
                          ghost
                          danger
                          type="primary"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    </div>
                  ))
                )}
              </>
            )}
          </Form.List>
        </Form.Item>
      </Styles.FieldSet>

      <Styles.FieldSet>
        <legend>{'Email'.toUpperCase()}</legend>
        <Form.Item label={'Email'}>
          <Form.List name={['contactGroups', 'emails']}>
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? (
                  <Button block type="dashed" onClick={() => add()}>
                    Create Email Field
                  </Button>
                ) : (
                  fields.map((field) => (
                    <div className="space" key={field.key}>
                      <Form.Item {...field} noStyle name={[field.name, 'email']} rules={[{ type: 'email' }]}>
                        <Input />
                      </Form.Item>

                      <Space>
                        <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />

                        <Button
                          ghost
                          danger
                          type="primary"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(field.name)}
                        />
                      </Space>
                    </div>
                  ))
                )}
              </>
            )}
          </Form.List>
        </Form.Item>
      </Styles.FieldSet>

      <Styles.FieldSet>
        <legend>{'Website'.toUpperCase()}</legend>
        <Form.Item label={'Website'}>
          <Form.List name={['contactGroups', 'websites']}>
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? (
                  <Button block type="dashed" onClick={() => add()}>
                    Create New Website
                  </Button>
                ) : (
                  fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div className="space" key={key}>
                      <Input.Group className="gap">
                        <Form.Item {...restField} noStyle name={[name, 'type']} fieldKey={[fieldKey, 'type']}>
                          <Select
                            style={{ minWidth: 150 }}
                            options={[
                              { label: 'Facebook', value: 'facebook' },
                              { label: 'LinkedIn', value: 'linkedin' },
                              { label: 'Twitter', value: 'twitter' },
                              { label: 'Website', value: 'website' },
                            ]}
                            placeholder={'Select Website'}
                          />
                        </Form.Item>
                        <Form.Item {...restField} noStyle name={[name, 'url']} fieldKey={[fieldKey, 'url']}>
                          <Input />
                        </Form.Item>
                      </Input.Group>

                      <Space>
                        <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />

                        <Button
                          ghost
                          danger
                          type="primary"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                        />
                      </Space>
                    </div>
                  ))
                )}
              </>
            )}
          </Form.List>
        </Form.Item>
      </Styles.FieldSet>

      <Styles.FieldSet>
        <legend>{'Address'.toUpperCase()}</legend>
        <Form.Item>
          <Form.List name={['contactGroups', 'addresses']}>
            {(fields, { add, remove }) => (
              <>
                {fields.length === 0 ? (
                  <Button block type="dashed" onClick={() => add()}>
                    Create New Address
                  </Button>
                ) : (
                  fields.map(({ key, name, fieldKey, ...restField }) => {
                    return (
                      <div key={key} className="address">
                        <Row gutter={[16, 0]} justify="space-between" align="top">
                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'address2']}
                              fieldKey={[fieldKey, 'address2']}
                              label={'Street'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'house_number']}
                              fieldKey={[fieldKey, 'house_number']}
                              rules={[{ required: true }]}
                              label={'House Number'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'postal_code']}
                              fieldKey={[fieldKey, 'postal_code']}
                              rules={[{ required: true }]}
                              label={'Postal Code'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'city']}
                              fieldKey={[fieldKey, 'city']}
                              rules={[{ required: true }]}
                              label={'City'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Form.Item
                              {...restField}
                              name={[name, 'state']}
                              fieldKey={[fieldKey, 'state']}
                              rules={[{ required: true }]}
                              label={'State'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'address3']}
                              fieldKey={[fieldKey, 'address3']}
                              label={'Extra Address 1'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={12}>
                            <Form.Item
                              {...restField}
                              name={[name, 'address4']}
                              fieldKey={[fieldKey, 'address4']}
                              label={'Extra Address 2'}
                            >
                              <Input />
                            </Form.Item>
                          </Col>

                          <Col span={24}>
                            <Row justify="end" style={{ marginTop: 32 }}>
                              <Space>
                                <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />

                                <Button
                                  ghost
                                  danger
                                  type="primary"
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                />
                              </Space>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    );
                  })
                )}
              </>
            )}
          </Form.List>
        </Form.Item>
      </Styles.FieldSet>
    </>
  );
}
