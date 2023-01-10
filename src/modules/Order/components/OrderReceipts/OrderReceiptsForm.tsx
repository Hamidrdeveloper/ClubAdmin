import { FormSubmit, SuperSelect } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import moment from 'moment';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderStatusChildModule } from '../../Order.module';
import { OrderModuleType, OrderReceiptsModalFields } from '../..';

const OrderReceiptsForm: FC<FormProps<OrderReceiptsModalFields> & { moduleType: OrderModuleType }> = ({
  onSubmit,
  isPending,
  moduleType,
}) => {
  const { t } = useTranslation();

  return (
    <Form
      name="order-receipts-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={
        moduleType !== 'partner'
          ? {
              number: 0,
              created_date: moment(),
              bookOutGoingItem: 'YES',
            }
          : {}
      }
    >
      <Row gutter={16}>
        {moduleType !== 'partner' && (
          <>
            <Col span={12}>
              {/* TODO: add today footer */}
              <Form.Item name="created_date" label={t('Order.Receipt.Field.Dates')}>
                <DatePicker format={intlDateFormat()} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ChangeOrderStatusTo" label={t('Order.Receipt.Field.ChangeOrderStatusTo')}>
                <SuperSelect
                  hasNew={false}
                  maxItemsToShow={7}
                  module={new OrderStatusChildModule()}
                  optionSelector={{ label: 'name', value: 'id' }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="book-outgoing-item" label={t('Order.Receipt.Field.BookOutgoingItem')}>
                <Select
                  options={[
                    { label: t('Global.Yes'), value: 'yes' },
                    { label: t('Global.No'), value: 'no' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="number" label={t('Order.Receipt.Field.Number')}>
                <InputNumber disabled />
              </Form.Item>
            </Col>
          </>
        )}
        <Col span={24}>
          <Form.Item name="comment" label={t('Global.Comment')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Comment') })} />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default OrderReceiptsForm;
