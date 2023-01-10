import { removeDash, removeUnderline, startCase } from '@src/shared/utils/engine.service';
import { Col, Row, Select } from 'antd';
import React, { Suspense, useState } from 'react';
import { useTranslation } from 'react-i18next';

import EmailTemplateSelect from '../container/EmailTemplateSelect';
import { Automatic, EmailTemplates } from '../model/email.entity';

interface ComponentProps {
  automatic: Automatic;
  onChange: (data: { notice_template_id: number | null; id: number }) => void;
}

const AutomaticSelect: React.FC<ComponentProps> = ({ automatic, onChange }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<number | null>(automatic.noticeTemplate?.id);

  const labels = {
    reset_password_email: t('Email.Field.ResetPasswordEmail'),
    'order-invoice-pdf-attachment': t('Email.Field.OrderInvoicePdfAttachment'),
    send_welcome_user_registration_email: t('Email.Field.WelcomeUserRegistration'),
    'two-factor-authentication-email': t('Email.Field.TwoFactorAuthenticationEmail'),
    order_sale_paid_email: t('Email.Field.OrderSalePaidEmail'),
    order_sale_partly_paid_email: t('Email.Field.OrderSalePartlyPaidEmail'),
    order_sale_over_paid_email: t('Email.Field.OrderSaleOverPaidEmail'),
    approved_partner: t('Email.Field.ApprovedPartner'),
    un_approved_partner: t('Email.Field.UnApprovedPartner'),
  };

  const handleChange = (notice_template_id: number | null) => {
    setValue(notice_template_id);
    onChange({ notice_template_id, id: automatic.id });
  };

  return (
    <Row align="middle" gutter={32}>
      <Col xs={8}>
        <label htmlFor="name">
          {labels[automatic.slug] ?? startCase(removeUnderline(removeDash(automatic.slug)))}
        </label>
      </Col>
      <Col xs={16}>
        <Suspense fallback={<Select disabled loading />}>
          <EmailTemplateSelect
            value={value ?? undefined}
            onChange={(template) => handleChange((template as EmailTemplates)?.id)}
          />
        </Suspense>
      </Col>
    </Row>
  );
};

export default AutomaticSelect;
