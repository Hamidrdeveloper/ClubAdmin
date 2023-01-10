import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Row, message, notification } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderDetailTabs } from '../model/order.entity';
import { EditButtonContainer } from './EditableText';

type EditableTextOrderPositionsProps = {
  value: string;
  child: ReactElement;
  onSubmit: (orderId: number, price_value: number) => any;
  orderId: number;
  vatValue: number;
  updateTab: (type: OrderDetailTabs) => void;
};
const EditableTextOrderPositions = ({
  value,
  child,
  onSubmit,
  orderId,
  vatValue,
  updateTab,
}: EditableTextOrderPositionsProps): ReactElement => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState<number>(0);
  const [pending, setPending] = useState(false);
  const { t } = useTranslation();
  return (
    <Row
      style={{
        width: !editMode ? '100%' : '',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      {!editMode && child}
      {editMode && (
        <Col span={10}>
          <InputNumber
            min={0}
            onChange={(editedValue) => setEditValue(editedValue)}
            defaultValue={Math.round(Number(value) * 100) / 100}
          />
        </Col>
      )}
      {editMode && (
        <>
          <Col span={4}>
            <EditButtonContainer>
              <Button
                onClick={() => {
                  setPending(true);
                  onSubmit(orderId, Math.round((Number(editValue) * 100) / (1 + vatValue / 100)) / 100)
                    .then(() => {
                      message.success(t('Order.Position.OrderPositionUpdate'));
                      setEditMode(false);
                      setPending(false);
                      updateTab(OrderDetailTabs.All);
                    })
                    .catch((error) => {
                      notification.error(error.message);
                      setPending(false);
                    });
                }}
                icon={<CheckOutlined />}
                size="small"
                type="ghost"
                loading={pending}
              />
            </EditButtonContainer>
          </Col>
          <Col span={4}>
            <EditButtonContainer>
              <Button icon={<CloseOutlined />} size="small" type="ghost" onClick={() => setEditMode(false)} />
            </EditButtonContainer>
          </Col>
        </>
      )}
      {!editMode && (
        <Col span={10}>
          <EditButtonContainer>
            <Button
              style={{ marginLeft: '5px', width: '50px !important' }}
              icon={<EditOutlined />}
              size="small"
              type="ghost"
              onClick={() => setEditMode(true)}
            />
          </EditButtonContainer>
        </Col>
      )}
    </Row>
  );
};

export default EditableTextOrderPositions;
