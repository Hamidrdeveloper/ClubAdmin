import { ProductCategory } from '@src/modules/ProductCategory';
import AsyncProductCategorySelect from '@src/modules/ProductCategory/containers/ProductCategoryAsyncSelect';
import { FormSubmit, SuperSelect } from '@src/shared/components';
import { Checkbox, Col, Divider, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderFlagChildModule } from '../../Order.module';
import { OrderFlag, OrderModuleType } from '../..';

type FormProps = {
  quantity: number | null;
  product_id: number | null;
  variation_id: number | null;
  number: number | null;
  item_data: string | null;
  flag: OrderFlag;
  category: ProductCategory;
  is_active: boolean;
};
//
type Props = {
  pending: boolean;
  quantity: number;
  supplierFullName: string;
  moduleType: OrderModuleType;
  setQuantity: (quantity: number) => void;
  onFormSubmit: (props: FormProps) => void;
};
export const OrderPositionAddFilterForm = ({
  pending,
  quantity,
  supplierFullName,
  moduleType,
  setQuantity,
  onFormSubmit,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form layout="horizontal" form={form} onFinish={onFormSubmit}>
      <Row gutter={[8, 0]}>
        <Col span={2}>
          <Form.Item name={'quantity'} initialValue={1}>
            <InputNumber
              min={1}
              placeholder={t('Global.Quantity')}
              value={quantity}
              onChange={(quantity) => setQuantity(quantity)}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name={'product_id'}>
            <InputNumber placeholder={t('Order.Position.ProductId')} min={1} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={'variation_id'}>
            <InputNumber min={1} placeholder={t('Order.Position.VariationId')} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={'number'}>
            <InputNumber min={1} placeholder={t('Global.Number')} />
          </Form.Item>
        </Col>
        <Col span={2}>
          <Form.Item name={'gtin'}>
            <Input placeholder="GTIN" disabled />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item name={'item_data'}>
            <Input placeholder={t('Global.Description')} />
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item name={'flag'} label={t('Order.Field.Flag')}>
            <SuperSelect module={new OrderFlagChildModule()} hasNew={false} />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 0]}>
        {moduleType !== 'purchase' && (
          <Col span={6}>
            <Form.Item name={'warehouse'} label={t('Order.Position.Warehouse')}>
              <Select defaultValue={'all'} disabled>
                <Select.Option value={'all'}>{t('Global.All')}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )}

        {moduleType === 'purchase' ? (
          <Col span={6}>
            <Form.Item name={'supplier'} label={t('Order.Position.Supplier')}>
              <Select defaultValue={'all'} disabled>
                <Select.Option value={'all'}>{supplierFullName}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        ) : (
          <Col span={6}>
            <Form.Item name={'supplier'} label={t('Order.Position.Supplier')}>
              <Select defaultValue={'all'} disabled>
                <Select.Option value={'all'}>{t('Global.All')}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        )}

        <Col span={6}>
          <Form.Item name={'category'} label={t('Global.Category')}>
            <AsyncProductCategorySelect hasNew={false} />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 0]}>
        <Col span={2}>
          <Form.Item name={'is_active'}>
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={pending} title={t('Global.Filter')} />
    </Form>
  );
};
