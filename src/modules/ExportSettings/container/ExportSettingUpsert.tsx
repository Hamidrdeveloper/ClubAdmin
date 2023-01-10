/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { OrderSalePure } from '@src/modules/Order';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import moment from 'moment';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ExportSettingForm from '../components/ExportSettingForm';
import ExportSettingModule from '../ExportSetting.module';
import { ExportSettingFormContext, ExportSettingModel } from '../model/ExportsSettings.entity';
import {
  createNewOrder as createNewOrderService,
  exportData as exportDataService,
} from '../service/Setting.service';

const ExportSettingUpsert = ({
  singleData,
  onCallback,
}: GlobalUpsertProps<ExportSettingModel>): ReactElement => {
  const module = useMemo(() => new ExportSettingModule(), []);
  const navigate = useNavigate();
  const [dateFieldNames, setDateFieldNames] = useState<string[]>();

  const { mutate, isLoading } = useMutation(
    ({ id, values }: GlobalMutationProps<ExportSettingFormContext>) => {
      return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
    },
  );

  const { mutate: exportData, isLoading: exportLoading } = useMutation(exportDataService);
  const { mutate: createNewOrder, isLoading: createOrderLoading } = useMutation(createNewOrderService);

  const normalizeDateFields = useCallback(
    (data: ExportSettingModel['data']) => {
      const results: Record<string, string> = {};

      // ['startDate', 'endDate']
      dateFieldNames?.forEach((dateFieldName) => {
        const dateFieldValue: string = data?.[dateFieldName];

        try {
          Object.assign(results, {
            // if dateFieldValue is null -> doesn't have a value, or the user cleared the date value
            [dateFieldName]: dateFieldValue ? moment(dateFieldValue).format('YYYY-MM-DD') : undefined,
          });
        } catch {
          // DO NOTHING
        }
      });

      return results;
    },
    [dateFieldNames],
  );

  const normalizeSelectFields = (
    data: ExportSettingFormContext['data'],
  ): Record<string, number | number[]> => {
    // ['startDate', 'company', 'orderStatus', ...]
    const allFieldsExceptDates = Object.keys(data).filter((key) => !dateFieldNames?.includes(key));

    // [['orderStatusId_object', {id: 12, ...}], ['companyId_object', {id: 3, ...}]]
    const fieldWithValuesArray: [string, any][] = allFieldsExceptDates.map((field) => [field, data[field]]);

    // (#Goshadi Backend)!!! => we have to prepare two object fields
    // 1. for sending and connecting the ids companyId (for their use)
    // 2. another for saving in form fields for ourselves (for our use) [since backend won't connect sh*t]
    // #1
    const extractIdFromObjectFields = fieldWithValuesArray.map(([label, v]) => {
      if (label.includes('_object')) {
        // if the select was multi
        if (Array.isArray(v)) {
          return [label.replace('_object', ''), v.map((valueObj) => valueObj?.id)];
        } else {
          return [label.replace('_object', ''), v?.id];
        }
      }
      return [label, v];
    });
    const idValueObject = Object.fromEntries(extractIdFromObjectFields);

    // #2
    const fieldValueObject = Object.fromEntries(fieldWithValuesArray);

    const mergedObject = Object.assign(fieldValueObject, idValueObject);
    return mergedObject;
  };

  const formSubmitHandler = (formValues: ExportSettingModel, itShouldExportAfterSubmit = false) => {
    if (itShouldExportAfterSubmit && singleData?.id) {
      exportData(singleData.id, {
        onSuccess: (exportSuccessMessage) => {
          message.success(exportSuccessMessage);
        },
      });

      return;
    }
    const { exportDataType, data, ...restValues } = formValues;

    const normalizedDateFieldsWithValue = normalizeDateFields(data);
    const normalizedSelectFields = normalizeSelectFields(data);

    const values: ExportSettingFormContext = {
      ...restValues,
      export_data_type_id: exportDataType.id,
      data: { ...data, ...normalizedDateFieldsWithValue, ...normalizedSelectFields },
    };

    mutate(
      { id: singleData?.id, values },
      {
        onSuccess: (settingData) => {
          onCallback?.(settingData);
        },
      },
    );
  };

  const onNewOrderCreation = () => {
    if (!singleData?.id) return;

    createNewOrder(singleData.id, {
      onSuccess: (data: OrderSalePure) => {
        const createdOrderId = data.id;

        navigate(`/admin/orders/order-sale/${createdOrderId}`);
      },
      onError: () => {
        message.error(i18n.t("ExportSettings.Couldn'tCreateNewOrder"));
      },
    });
  };

  return (
    <ExportSettingForm
      isPending={isLoading}
      initialValues={singleData}
      onSubmit={formSubmitHandler}
      onNewOrderCreation={onNewOrderCreation}
      onNewOrderLoading={createOrderLoading}
      setDateFieldNames={setDateFieldNames}
      submitAndExportLoading={exportLoading}
    />
  );
};

export default ExportSettingUpsert;
