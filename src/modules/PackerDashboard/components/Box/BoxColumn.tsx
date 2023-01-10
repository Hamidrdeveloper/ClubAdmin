import { Package } from '@modules/Package';
import { Button, Col, Divider, Image, List, Row, Space } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { BoxActionType } from '../../model/packer';

type Props = { box: Package | null | undefined; onAction: (type: BoxActionType) => void };
function BoxColumn({ box, onAction }: Props): ReactElement {
  const { t } = useTranslation();
  //
  return (
    <Row justify="start" align="top">
      <Col span={24}>
        <h3>
          <b>{t('PackerDashboard.Box')}</b>
        </h3>
        <Image src={'../../../assets/images/dashboard/box.png'} preview={false} />

        <Divider />
        <h4>{t('PackerDashboard.BoxInformation')}</h4>
        <h4>{box?.id ?? t('PackerDashboard.NoData')}</h4>
      </Col>

      <Divider />

      <Col span={24}>
        {box && (
          <List
            dataSource={BoxColumns}
            grid={{ column: 2 }}
            renderItem={(column) => (
              <Space direction="vertical">
                <h3>{column.title}</h3>
                {typeof column.dataIndex === 'string' ? (
                  <h4>{box[column.dataIndex as string] ?? ' - '}</h4>
                ) : (
                  <h4>{box[column.dataIndex[0]][column.dataIndex[1]] ?? ' - '}</h4>
                )}
              </Space>
            )}
          />
        )}
      </Col>

      <Button onClick={() => onAction('Close')}>{t('PackerDashboard.CloseBox')}</Button>
      <Button onClick={() => onAction('Close')}>{t('PackerDashboard.CloseBoxShipping')}</Button>
      <Button onClick={() => onAction('Close')}>{t('PackerDashboard.GenerateDelivery')}</Button>
    </Row>
  );
}

export default BoxColumn;

const BoxColumns = [
  {
    key: 'id',
    className: 'id number',
    dataIndex: 'id',
    title: 'ID',
    fixed: 'left' as any,
  },
  {
    key: 'name',
    dataIndex: ['packingType', 'name'],
    title: 'Packing Type',
  },
  {
    key: 'length',
    dataIndex: 'length',
    title: 'Length',
  },
  {
    key: 'width',
    dataIndex: 'width',
    title: 'Width',
  },
  {
    key: 'height',
    dataIndex: 'height',
    title: 'Height',
  },
  {
    key: 'weight',
    dataIndex: 'gross_weight',
    title: 'Weight',
  },
];
