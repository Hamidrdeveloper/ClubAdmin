import { Button, Form } from 'antd';
import React, { MouseEventHandler, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './FormSubmit.style';

const FormSubmit: React.FC<{
  isPending?: boolean;
  title?: string;
  icon?: ReactNode;
  disabledPrimary?: boolean;
  Secondary?: ReactNode | ReactNode[];
  justify?: 'end' | 'center' | 'start';
  onClick?: MouseEventHandler<HTMLElement>;
}> = ({ isPending, title, Secondary, disabledPrimary = false, icon, justify = 'end', onClick }) => {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer className="form-submit" justify={justify}>
      {Array.isArray(Secondary) ? (
        Secondary?.map((btn) => <Form.Item className="secondary">{btn}</Form.Item>)
      ) : (
        <Form.Item className="secondary">{Secondary}</Form.Item>
      )}

      <Form.Item>
        <Button
          icon={icon}
          type="primary"
          htmlType="submit"
          onClick={onClick}
          loading={isPending}
          data-cy="form-submit-btn"
          disabled={disabledPrimary}
        >
          {title ? title : t('Global.Submit')}
        </Button>
      </Form.Item>
    </Styles.MainContainer>
  );
};

export default FormSubmit;
