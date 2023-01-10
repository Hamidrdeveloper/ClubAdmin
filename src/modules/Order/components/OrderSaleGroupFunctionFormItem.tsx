import { FlagSelect } from '@src/modules/Flag';
import { LanguageSelect } from '@src/modules/Language';
import { SuperSelect } from '@src/shared/components';
import { Checkbox, Col, Form, FormInstance, Row } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderStatusChildModule } from '../Order.module';

interface Props {
  field: string;
  form: FormInstance;
}
const OrderSaleGruopFunctionFormItem = ({ field, form }: Props): ReactElement => {
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const { t } = useTranslation();
  return (
    <Col span={12} key={field}>
      <Row>
        <Col span={2}>
          <Checkbox
            onClick={() => {
              setIsDisable(!isDisable);
              if (!isDisable) {
                form.resetFields([field]);
              }
            }}
          />
        </Col>
        <Col span={22}>
          <Form.Item
            name={field}
            label={
              field === 'language_id'
                ? t('Global.Language')
                : field === 'flag_ids'
                ? t('SidePanel.Flags')
                : field === 'order_status_id'
                ? t('Order.Field.OrderStatus')
                : ''
            }
          >
            {generateFormFields(field, isDisable)}
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

function generateFormFields(type: string, isDisable: boolean) {
  switch (type) {
    case 'language_id':
      return <LanguageSelect disabled={isDisable} />;
    case 'flag_ids':
      return <FlagSelect isMulti disabled={isDisable} />;
    case 'order_status_id':
      return (
        <SuperSelect
          isClearable={false}
          className="status-select"
          hasNew={false}
          maxItemsToShow={7}
          module={new OrderStatusChildModule()}
          optionSelector={{ label: 'name', value: 'id' }}
          disabled={isDisable}
        />
      );

    default:
      return <></>;
  }
}

export default OrderSaleGruopFunctionFormItem;
