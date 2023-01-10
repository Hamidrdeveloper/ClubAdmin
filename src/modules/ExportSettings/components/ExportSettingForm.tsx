import ExportTypeSelect from '@src/modules/ExportTypes/container/ExportTypeSelect';
import { DataTypes, ExportTypeModel } from '@src/modules/ExportTypes/model/ExportsTypes.entity';
import { FormSubmit } from '@src/shared/components';
import AsyncFilterSelect from '@src/shared/components/PageLayout/Lists/Filters/AsyncFilterSelect';
import { intlDateFormat, removeId, removeUnderline, startCase } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Col, DatePicker, Divider, Form, Input, InputNumber, Row } from 'antd';
import moment from 'moment';
import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ExportSettingModel } from '../model/ExportsSettings.entity';

type filterFieldsModel = {
  name: string;
  label: string;
  type: DataTypes;
  url: string | null;
};

type FormProps<T> = {
  initialValues?: T;
  isPending: boolean;
  onNewOrderLoading: boolean;
  submitAndExportLoading: boolean;
  onNewOrderCreation: () => unknown;
  setDateFieldNames: Dispatch<SetStateAction<string[]>>;
  onSubmit: (data: T, shouldExportAfterSubmit?: boolean) => void;
};

const ExportSettingForm = ({
  onSubmit,
  isPending,
  initialValues,
  setDateFieldNames,
  onNewOrderLoading,
  onNewOrderCreation,
  submitAndExportLoading,
}: FormProps<ExportSettingModel>): ReactElement => {
  const { export_setting_id: id } = useParams();

  const editMode = !!id;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [filterFields, setFilterFields] = useState<filterFieldsModel[]>();
  const [settingFields, setSettingFields] = useState<filterFieldsModel[]>();

  const [isCreateOrderButtonVisible, setCreateOrderButtonVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!initialValues) return;

    onExportTypeChange(initialValues.exportDataType);

    const finalFormValues = {
      ...initialValues,
      // we later set this field in setFilterFieldsData function
      data: {},
    };

    form.setFieldsValue(finalFormValues);
  }, [initialValues]);

  useEffect(() => {
    setFilterFieldsData();
  }, [filterFields]);

  const onExportTypeChange = (selectedExportType: ExportTypeModel): void => {
    // only show create Order Button if the export type name was custom - #6177
    setCreateOrderButtonVisible(selectedExportType.name === 'custom');

    // from: {companyId: 'int', ... } => to: [{name: 'companyId', label: 'company', type: 'int'}]
    const normalizedFilters = transformFilterFieldsFromObjectToArray(selectedExportType);

    // from: {book_paid: 'bool', ... } => to: [{name: 'book_paid', label: 'Book Paid', type: 'bool'}]
    const normalizedSettingFilters = transformFilterFieldsFromObjectToArray({
      filters: selectedExportType.settings,
      filter_links: selectedExportType.filter_links,
    });

    setDateFieldNames(
      normalizedFilters?.filter((field) => field.type === 'date').map((dateField) => dateField.name),
    );

    setFilterFields(normalizedFilters);
    setSettingFields(normalizedSettingFilters);
  };

  const setFilterFieldsData = (): void => {
    if (!initialValues || !filterFields) return;

    const dateFieldNames = filterFields
      .filter((filterField) => filterField.type === 'date')
      .map((field) => field.name);

    const dateFieldsNameWithValue = dateFieldNames.map((fieldName) => ({
      [fieldName]: initialValues.data[fieldName] ? moment(initialValues.data[fieldName], 'YYYY.MM.DD') : '',
    }));

    const result = Object.assign({ ...initialValues.data }, ...dateFieldsNameWithValue);

    form.setFieldsValue({ ...initialValues, data: result });
  };

  const onSubmitAndExportBtnClick = (e) => {
    e.preventDefault();
    const data = form.getFieldsValue();
    onSubmit(data, true);
  };

  const SubmitBtn = useMemo(
    () => (
      <Button htmlType="submit" loading={isPending}>
        {t('Global.Submit')}
      </Button>
    ),
    [],
  );

  const CreateOrderBtn = useMemo(() => {
    if (isCreateOrderButtonVisible) {
      return (
        <Button onClick={onNewOrderCreation} loading={onNewOrderLoading}>
          {t('ExportSettings.CreateOrder')}
        </Button>
      );
    } else {
      return <></>;
    }
  }, [isCreateOrderButtonVisible, onNewOrderCreation, onNewOrderLoading]);

  return (
    <Form form={form} onFinish={onSubmit} layout={'vertical'}>
      <Row gutter={32} align="bottom">
        <Col xs={12}>
          <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
            <Input
              placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })}
              disabled={editMode}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item
            name={'exportDataType'}
            rules={[{ required: true }]}
            label={t('ExportSettings.ExportDataType')}
          >
            <ExportTypeSelect onChange={onExportTypeChange} disabled={editMode} />
          </Form.Item>
        </Col>

        {filterFields?.map((field) => (
          <Col xs={12} key={field.name}>
            {generateFilterFields(field)}
          </Col>
        ))}
      </Row>

      {settingFields && (
        <>
          <Divider />
          {settingFields.map((setting) => (
            <Col xs={12} key={setting.name}>
              {generateFilterFields(setting, 'settings')}
            </Col>
          ))}
        </>
      )}

      {editMode ? (
        <FormSubmit
          isPending={submitAndExportLoading}
          onClick={onSubmitAndExportBtnClick}
          Secondary={[CreateOrderBtn, SubmitBtn]}
          title={t('ExportSettings.Export')}
        />
      ) : (
        <FormSubmit isPending={isPending} />
      )}
    </Form>
  );
};

function transformFilterFieldsFromObjectToArray({
  filters,
  filter_links,
}: {
  filters: Record<string, DataTypes>;
  filter_links: Record<string, string>;
}): filterFieldsModel[] {
  const selectedFiltersKeys = Object.keys(filters);

  return selectedFiltersKeys.map((key) => ({
    name: key,
    type: filters[key],
    url: filter_links[key] ?? null,
    label: removeId(startCase(removeUnderline(key))),
  }));
}

function generateFilterFields({ name, type, label, url }: filterFieldsModel, parentName = 'data'): ReactNode {
  const usualProps = { name: [parentName, name], label };

  switch (type) {
    case 'date': {
      return (
        <Form.Item {...usualProps}>
          <DatePicker format={intlDateFormat()} />
        </Form.Item>
      );
    }

    case 'int': {
      if (url) {
        const props = { name: [parentName, `${name}_object`], label };

        return (
          <Form.Item {...props}>
            <AsyncFilterSelect url={url} title={label} />
          </Form.Item>
        );
      } else {
        return (
          <Form.Item {...usualProps}>
            <InputNumber />
          </Form.Item>
        );
      }
    }

    case 'array': {
      const props = { name: [parentName, `${name}_object`], label };

      if (url) {
        return (
          <Form.Item {...props}>
            <AsyncFilterSelect url={url} title={label} isMulti />
          </Form.Item>
        );
      }
    }

    case 'string': {
      return (
        <Form.Item {...usualProps}>
          <Input />
        </Form.Item>
      );
    }

    case 'bool': {
      const props = { name: usualProps.name, valuePropName: 'checked' };

      return (
        <Form.Item {...props}>
          <Checkbox>{label}</Checkbox>
        </Form.Item>
      );
    }

    default:
      return <></>;
  }
}

export default ExportSettingForm;
