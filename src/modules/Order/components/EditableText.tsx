import { CheckOutlined, CloseOutlined, EditOutlined, UndoOutlined } from '@ant-design/icons';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Input, InputNumber, Row, Tooltip } from 'antd';
import moment from 'moment';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type EditableTextProps = {
  title: ReactElement;
  child: ReactElement;
  secondButton?: ReactElement;
  disabled?: boolean;
  defaultEditValue?: string | number | moment.Moment | undefined;
  min?: number | string;
  max?: number;
  secondTitle?: string;
  hasSecond?: boolean;
  isConstant?: boolean;
  isDate?: boolean;
  isNumber?: boolean;
  isPending?: boolean;
  onSubmit?: (value: string | number | moment.Moment, secondVal?: string | number) => void;
  shippedOn?: Date | null;
  onCancelShippedOn?: (value: null) => void;
};

const EditableText = ({
  title,
  child,
  secondButton,
  defaultEditValue = '',
  min,
  max,
  secondTitle = '',
  hasSecond = false,
  disabled = false,
  isNumber = false,
  isDate = false,
  isConstant = false,
  isPending = false,
  onSubmit,
  shippedOn,
  onCancelShippedOn,
}: EditableTextProps): ReactElement => {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState<string | number | moment.Moment>(defaultEditValue);
  const [secondEditValue, setSecondEditValue] = useState<string | number>('');
  const { t } = useTranslation();

  return (
    <Row className="row" align="middle">
      <Col span={8} className="title">
        {title}
      </Col>
      <Col span={isConstant ? 16 : editMode ? 12 : shippedOn ? 12 : secondButton ? 12 : 14}>
        {editMode ? (
          isNumber ? (
            <Row>
              <Col span={hasSecond ? 8 : 24}>
                <InputNumber
                  disabled={isPending || disabled}
                  value={editValue as number}
                  min={min}
                  max={max}
                  onChange={(text) => setEditValue(text)}
                />
              </Col>
              {hasSecond && (
                <Col span={16}>
                  <InputNumber
                    placeholder={secondTitle}
                    disabled={isPending || disabled}
                    value={secondEditValue}
                    onChange={(text) => setSecondEditValue(text)}
                  />
                </Col>
              )}
            </Row>
          ) : isDate ? (
            <DatePicker
              format={intlDateFormat()}
              disabled={isPending || disabled}
              defaultValue={editValue ? moment(editValue) : undefined}
              placeholder={t('Order.Settings.SelectDate')}
              onChange={(date) => date && setEditValue(date)}
            />
          ) : (
            <Input
              min={min}
              max={max}
              disabled={isPending || disabled}
              value={editValue as string}
              onChange={(text) => setEditValue(text.target.value)}
            />
          )
        ) : (
          child
        )}
      </Col>
      {!isConstant && !editMode && !disabled && (
        <Col span={2}>
          <EditButtonContainer>
            <Button
              icon={<EditOutlined />}
              size="small"
              type="ghost"
              onClick={() => setEditMode(true)}
              disabled={disabled}
            />
          </EditButtonContainer>
        </Col>
      )}

      {!isConstant && !editMode && !disabled && shippedOn && (
        <Col span={2}>
          <EditButtonContainer>
            <Tooltip className="action-btn" title={t('Order.Edit.CancelShippedOnTooltip')}>
              <Button
                icon={<UndoOutlined />}
                size="small"
                type="ghost"
                onClick={() => onCancelShippedOn!(null)}
                disabled={disabled}
                loading={isPending}
              />
            </Tooltip>
          </EditButtonContainer>
        </Col>
      )}

      {!isConstant && !editMode && !disabled && secondButton && secondButton}
      {!isConstant && editMode && !disabled && (
        <>
          <Col span={2}>
            <EditButtonContainer>
              <Button
                icon={<CheckOutlined />}
                size="small"
                type="ghost"
                loading={isPending}
                onClick={() => onSubmit?.(editValue, secondEditValue)}
              />
            </EditButtonContainer>
          </Col>
          <Col span={2}>
            <EditButtonContainer>
              <Button icon={<CloseOutlined />} size="small" type="ghost" onClick={() => setEditMode(false)} />
            </EditButtonContainer>
          </Col>
        </>
      )}
    </Row>
  );
};

export const EditButtonContainer = styled.div<{ alignEnd?: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.alignEnd ? 'flex-end' : 'center')};
  align-items: center;

  & > * {
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    border: 1px solid #326d94;
  }
`;

export default EditableText;
