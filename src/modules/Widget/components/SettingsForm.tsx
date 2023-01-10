import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form } from 'antd';
import React, { ReactElement, useEffect } from 'react';

import { Widget } from '../model/widget.entity';

const SettingsForm = ({ initialValues, onSubmit, isPending }: FormProps<Widget>): ReactElement => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        translate:
          initialValues.translate.length > 0
            ? initialValues.translate
            : [{ locale: undefined, title: '', content: '' }],
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="settings-form"
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, title: '' }] }}
    >
      <DescriptionArrayInput isEditor inputName="title" inputDesc="content" />

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default SettingsForm;
