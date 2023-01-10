import { CountrySelect } from '@src/modules/Country';
import { UserSelect } from '@src/modules/User';
import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Alert, Checkbox, Col, DatePicker, Form, Row } from 'antd';
import moment from 'moment';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FullCompetitionModel } from '../model/Competition.entity';

const FullCompetitionEditForm = ({
  isPending,
  initialValues,
  onSubmit,
}: FormProps<FullCompetitionModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isEditable, setEditable] = useState<boolean>(initialValues?.is_editable ?? false);

  useEffect(() => {
    if (initialValues) {
      setEditable(initialValues.is_editable);

      form.setFieldsValue({
        ...initialValues,
        release_date: initialValues.release_date ? moment(initialValues.release_date) : null,
        available_until: initialValues.available_until ? moment(initialValues.available_until) : null,
        translations:
          initialValues.translations?.length > 0
            ? initialValues.translations
            : [{ locale: undefined, name: '', title: '' }],
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="competition-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translations: [{ locale: undefined, title: '', name: '' }], must_accept_terms: false }}
    >
      {!isEditable && (
        <Alert
          style={{ marginBottom: '1rem' }}
          showIcon
          type="warning"
          message="Warning"
          description="This Competition is not Editable"
        />
      )}
      <Row gutter={[16, 0]} justify="space-between">
        <Col span={12}>
          <Form.Item name="release_date" label={t('Competition.StartDate')}>
            <DatePicker format={intlDateFormat()} disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="available_until" label={t('Competition.EndDate')}>
            <DatePicker format={intlDateFormat()} disabled={!isEditable} />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Suspense fallback={FallbackSelect(t('Competition.AllowedCountries'))}>
            <Form.Item
              name="country_list"
              label={t('Competition.AllowedCountries')}
              tooltip={t('Competition.WhenNothingSelectedAllCountriesAreAllowedToJoinCompetition')}
            >
              <CountrySelect
                isMulti
                menuPlacement="top"
                disabled={!isEditable}
                placeholder={t('Competition.AllCountriesAreAllowed')}
              />
            </Form.Item>
          </Suspense>
        </Col>

        <Col xs={24} md={12}>
          <Suspense fallback={FallbackSelect(t('Competition.BlockedUsers'))}>
            <Form.Item name="blacklist_users" label={t('Competition.BlockedUsers')}>
              <UserSelect isMulti menuPlacement="top" disabled={!isEditable} />
            </Form.Item>
          </Suspense>
        </Col>
      </Row>

      <DescriptionArrayInput
        inputName={'title'}
        name={'translations'}
        // NOTES: Maybe this line is over-do - check if it support html tags
        isEditor={isEditable}
        disabled={!isEditable}
      />

      <Row gutter={[16, 0]} justify="start">
        <Col span={24}>
          <Form.Item required valuePropName="checked" name="must_accept_terms">
            <Checkbox>{t('Competition.AcceptTerms')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      {isEditable && <FormSubmit isPending={isPending} />}
    </Form>
  );
};

export default FullCompetitionEditForm;
