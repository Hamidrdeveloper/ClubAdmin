import { OrderModuleType } from '@modules/Order';
import i18n from '@src/core/i18n/config';
import { EmailTemplates } from '@src/modules/Email/model/email.entity';
import { FormSubmit, Loader } from '@src/shared/components';
import { PaginationContext, PaginationRequest } from '@src/shared/models';
import { Col, Form, Pagination, Radio, Row, Space } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { sendEmailPreviewWithoutCaution } from '../../controllers/email.controller';
import { getAllTemplatesForEmailTab } from '../../controllers/noticeTemplates.controller';

type Props = {
  isFormPending: boolean;
  orderId: number;
  language: string;
  selectedLocale: string;
  moduleType: OrderModuleType;
  setTemplateId: (template_id: number) => void;
};
export const OrderGeneralEmailTab = ({
  isFormPending,
  orderId,
  language,
  moduleType,
  selectedLocale,
  setTemplateId,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [formSubmitPending, setFormSubmitPending] = useState<boolean>(isFormPending);
  const [templates, setTemplates] = useState<EmailTemplates[]>([]);
  const [isPending, setPending] = useState<boolean>(false);
  const [paginate, setPaginate] = useState<PaginationContext>();
  const [pagination, setPagination] = useState<PaginationRequest>({ page: 1, per_page: 10 });

  useEffect(() => {
    setPending(true);
    getAllTemplatesForEmailTab({ pagination, locale: selectedLocale })
      .then(([templates, pagination]) => {
        setTemplates(templates);
        setPaginate(pagination);
        setPending(false);
      })
      .catch(() => setPending(false));
  }, [pagination, selectedLocale]);

  const onFormSubmit = ({ template_id }: { template_id: number }) => {
    setFormSubmitPending(true);
    sendEmailPreviewWithoutCaution(orderId, { template_id, language }, moduleType).finally(() =>
      setFormSubmitPending(false),
    );
  };

  const onFormDataChange = (formDataChanged) => {
    setTemplateId(formDataChanged[0]['value']);
  };

  if (isPending) return <Loader title={t('Order.Email.Loader')} />;
  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            layout={'horizontal'}
            form={form}
            colon={false}
            name="order-email"
            labelAlign="left"
            onFinish={onFormSubmit}
            onFieldsChange={(_, all) => onFormDataChange(all)}
          >
            <FormItem name={'template_id'}>
              <Radio.Group>
                <Space direction="vertical">
                  <Row gutter={16}>
                    {templates.map(({ name, id, translate }) => (
                      <Col key={id} span={12}>
                        <Radio value={id}>
                          {translate?.find((tr) => tr.locale === i18n.language)?.['name'] ?? name}
                        </Radio>
                      </Col>
                    ))}
                  </Row>
                </Space>
              </Radio.Group>
            </FormItem>
            <PaginationContainer>
              <Pagination
                onChange={(page, pageSize) => setPagination({ page, per_page: pageSize })}
                disabled={isPending}
                total={paginate?.total}
                current={paginate?.current_page}
                pageSize={paginate?.per_page || 10}
              />
            </PaginationContainer>
            <FormItem>
              <FormSubmit isPending={formSubmitPending} title={t('Order.Email.SendEmail')} />
            </FormItem>
          </Form>
        </Col>
      </Row>
    </>
  );
};

const PaginationContainer = styled.div`
  margin-left: 16px;
`;
