import { FormSubmit, Loader } from '@src/shared/components';
import AttributeTypesInput from '@src/shared/components/AttributeTypes/AttributeTypesGroup';
import { Form } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationAutoGenerate } from '../model/autoGenerate.entity';

type Props = {
  onSubmit: (values: VariationAutoGenerate) => void;
  isPending: boolean;
};
const AutoGenerateForm = ({ onSubmit, isPending }: Props): ReactElement => {
  const [form] = useForm();
  const { t } = useTranslation();
  useEffect(() => {
    form.setFieldsValue({
      attributes: [{}],
    });
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onSubmit}>
      <Suspense fallback={<Loader title={t('Product.Variation.LoadingAutoGenerating')} />}>
        <Form.Item>
          <AttributeTypesInput haveVisibleField={false} multiOptions form={form} />
        </Form.Item>
      </Suspense>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default AutoGenerateForm;
