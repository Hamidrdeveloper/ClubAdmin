import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// import { AuthContext } from '@src/core';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Divider, Form, Input, Row, Select, Space } from 'antd';
import React, { Fragment, ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { useParams } from 'react-router-dom';

import { SocialMediaModel } from '../model/socialMedia.entity';

export const SocialMediaForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<SocialMediaModel[]>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  // const [editMode, setEditMode] = useState(false);
  // const { subdomain_id: id } = useParams();
  // const { loggedInUserRole } = useContext(AuthContext);
  const socialIcons = [
    { label: 'FacebookIcon', value: '/assets/images/footer/facebook.png' },
    { label: 'InstagramIcon', value: '/assets/images/footer/insta.png' },
    { label: 'YoutubeIcon', value: '/assets/images/footer/tube.png' },
  ];
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ data: [...initialValues] });
    }

    // if (id) {
    //   setEditMode(true);
    // }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="socialMediaSetting-form"
      onFinish={(data) => onSubmit(data['data'])}
      initialValues={{ data: [{ name: undefined, url: undefined, icon_url: undefined }] }}
    >
      <Form.Item>
        <Form.List name={'data'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                <Fragment key={key}>
                  <Row gutter={[16, 0]} justify="end" align="middle">
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        label={t('Global.Name')}
                        name={[name, 'name']}
                        fieldKey={[fieldKey, 'name']}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('Global.Name'),
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        label={t('Global.Url')}
                        name={[name, 'url']}
                        fieldKey={[fieldKey, 'url']}
                      >
                        <Input
                          placeholder={t('Global.InputPlaceholder', {
                            title: t('Global.Url'),
                          })}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={7}>
                      <Form.Item
                        {...restField}
                        label={t('Global.IconUrl')}
                        name={[name, 'icon_url']}
                        fieldKey={[fieldKey, 'icon_url']}
                      >
                        <Select options={socialIcons} />
                      </Form.Item>
                    </Col>
                    <Col span={3}>
                      <Space>
                        {index === 0 && (
                          <Button ghost type="primary" icon={<PlusOutlined />} onClick={() => add()} />
                        )}

                        {fields.length > 1 && (
                          <Button
                            ghost
                            danger
                            type="primary"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                          />
                        )}
                      </Space>
                    </Col>
                  </Row>
                  <Divider />
                </Fragment>
              ))}
            </>
          )}
        </Form.List>
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};
