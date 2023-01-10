/* eslint-disable */
import { ConsoleSqlOutlined } from '@ant-design/icons';
import i18n from '@src/core/i18n/config';
import StockSelect from '@src/modules/Stock/containers/StockSelect';
import { Stock } from '@src/modules/Stock/model';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { ApiBuilder } from '@src/shared/utils';
import { Alert, Form, Input, InputNumber, Popconfirm, Select, Table, Typography, message } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StockCorrection } from '../model/ProductStockCorrection';
import { variationIdAtom } from '../services/variationStore';
import { FormContainer } from './styles/StockCorrection.style';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  required = false,
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case 'number': {
      inputNode = <InputNumber min={0} />;
      break;
    }

    default: {
      inputNode = <Input />;
      break;
    }
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              message: '',
              required: required,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

// TODO: translation - move this to service
const correctionAPI = new ApiBuilder<StockCorrection>(
  'inventories',
  i18n.t('Product.Stock.Correction.Title'),
);
export const StockCorrectionTable = ({ onSubmit, isPending }): ReactElement => {
  const [variationId] = useAtom(variationIdAtom);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<undefined | number>(undefined);

  const [isLoading, setLoading] = useState<boolean>(true);

  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [data, setData] = useState<any>();

  useEffect(() => {
    if (variationId) {
      setLoading(true);
      const params = { productVariationId: variationId };

      if (selectedWarehouseId) Object.assign(params, { warehouseId: selectedWarehouseId });
      // request to fetch all
      correctionAPI
        .getAll({ params })
        .then((resp) => {
          setData(resp.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [variationId, selectedWarehouseId]);

  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => {
    return record?.id === editingKey;
  };

  const edit = (record) => {
    form.setFieldsValue(record);
    setEditingKey(record?.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.id);

      if (index > -1) {
        const item = newData[index];

        // NOTE: sending item(whole previous object) and row(new Changes) to upsert component -> backend
        onSubmit({ item, row });

        // NOTE refetch functionallity
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      const problematicFields = errInfo.errorFields.map((field) => field.name);
      message.error(
        `Fill '${problematicFields.join(`', '`)}' field${problematicFields.length === 1 ? '' : 's'}`,
      );
    }
  };

  const columns = [
    {
      key: 'id',
      dataIndex: `id`,
      title: t('Global.ID'),
    },
    {
      type: 'number',
      key: 'storage_variation_id',
      dataIndex: 'storage_variation_id',
      title: t('Product.Stock.Correction.StorageVariationID'),
    },
    {
      key: 'purchase_quantity',
      dataIndex: 'purchase_quantity',
      title: t('Product.Stock.Correction.PurchaseQuantity'),
    },
    {
      key: 'picked_quantity',
      dataIndex: 'picked_quantity',
      title: t('Product.Stock.Correction.PickedQuantity'),
    },
    {
      key: 'packed_quantity',
      dataIndex: 'packed_quantity',
      title: t('Product.Stock.Correction.PackedQuantity'),
    },
    {
      key: 'reserved_quantity',
      dataIndex: 'reserved_quantity',
      title: t('Product.Stock.Correction.ReservedQuantity'),
    },
    {
      key: 'delta_quantity',
      dataIndex: 'delta_quantity',
      title: t('Product.Stock.Correction.DeltaQuantity'),
    },
    {
      editable: true,
      required: true,
      key: `quantity`,
      type: 'number',
      dataIndex: `quantity`,
      title: t('Product.Stock.Correction.Quantity'),
    },
    {
      title: t('Product.Stock.Correction.Operation'),
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              {t('Global.Save')}
            </Typography.Link>
            <Popconfirm title={t('Product.Stock.Correction.Cancel')} onConfirm={cancel}>
              <a>{t('Global.Cancel')}</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            {t('Global.Edit')}
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.type,
        dataIndex: col.dataIndex,
        title: col.title,
        required: col.required,
        editing: isEditing(record),
      }),
    };
  });

  const warehouseChangeHandler = (warehouse: Stock) => {
    setSelectedWarehouseId(warehouse?.id);
  };

  return (
    <>
      <Alert
        type="info"
        message={
          <Suspense fallback={FallbackSelect(t('Product.Stock.Correction.Warehouse'))}>
            <StockSelect onChange={warehouseChangeHandler} />
          </Suspense>
        }
        style={{ padding: '20px', marginBottom: '12px' }}
      />

      <FormContainer>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            loading={isPending || isLoading}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </FormContainer>
    </>
  );
};

export default StockCorrectionTable;
