import i18n from '@src/core/i18n/config';
import { Form } from 'antd';
import React, { FC } from 'react';
import Select from 'react-select';

const FallbackSelect: FC<string> = (translation) => {
  return (
    <Form.Item label={translation}>
      <Select isDisabled isLoading placeholder={i18n.t('Global.SelectPlaceholder', { title: translation })} />
    </Form.Item>
  );
};
export default FallbackSelect;
