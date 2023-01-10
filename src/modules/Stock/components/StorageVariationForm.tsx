import i18n from '@src/core/i18n/config';
import { FormSubmit } from '@src/shared/components';
import { Alert, Col, Form, FormInstance, Row } from 'antd';
import { atom, useAtom } from 'jotai';
import React, { FC, ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select, { ActionMeta } from 'react-select';

import { StorageVariation } from '../model/storageVariation';
import { warehouseIdAtom } from '../pages/StockManage.page';
import BuildingSelect from '../submodules/Building/containers/BuildingSelect';
import { Building } from '../submodules/Building/model/Building';
import { Floor } from '../submodules/Floor/model/floor';
import { Regal } from '../submodules/Regal/model/Regal';
import { Shelf } from '../submodules/Shelf/model/shelf';
import { Zone } from '../submodules/Zone/model/zone';
import RelatedFloorSelect from './RelatedSelects/RelatedFloorSelect';
import RelatedRegalSelect from './RelatedSelects/RelatedRegalSelect';
import RelatedShelfSelect from './RelatedSelects/RelatedShelfSelect';
import RelatedZoneSelect from './RelatedSelects/RelatedZoneSelect';
import FormStyle from './styles/Form.style';

interface FormProps<T> {
  isPending: boolean;
  onSubmit: (data: T, form: FormInstance) => void;
}

type SelectedValuesProps = {
  building: Building | null;
  floor: Floor | null;
  zone: Zone | null;
  regal: Regal | null;
  shelf: Shelf | null;
};

export const selectedStorageVariationFieldsAtom = atom<Partial<SelectedValuesProps>>({});

const StorageVariationForm = ({ isPending, onSubmit }: FormProps<StorageVariation>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const formSubmitHandler = async (formValues: StorageVariation) => {
    onSubmit?.(formValues, form);
  };

  const [warehouseId] = useAtom(warehouseIdAtom);

  useEffect(() => {
    return () => {
      setSelectedValues({});
    };
  }, []);

  const [selectedValues, setSelectedValues] = useAtom(selectedStorageVariationFieldsAtom);

  const buildingChangeHandler = (data: Building, action: ActionMeta<Building> | null) => {
    if (action === null) {
      addOption(data);
    }

    function addOption(data: Building) {
      setSelectedValues({ building: data });
      form.setFieldsValue({ floor: '', zone: '', regal: '', shelf: '' });
    }

    switch (action?.action) {
      case 'clear':
        form.resetFields();
        setSelectedValues({});
        break;

      case 'select-option':
        addOption(data);
        break;
    }
  };

  const floorChangeHandler = (data: Floor, action: ActionMeta<Floor> | null) => {
    if (action === null) {
      addOption(data);
    }

    function addOption(data: Floor) {
      setSelectedValues(({ building }) => ({ building: building, floor: data }));
      form.setFieldsValue({ zone: '', regal: '', shelf: '' });
    }

    switch (action?.action) {
      case 'clear':
        form.setFieldsValue({ floor: '', zone: '', regal: '', shelf: '' });
        setSelectedValues((prev) => ({ ...prev, floor: null, zone: null, regal: null, shelf: null }));
        break;

      case 'select-option':
        addOption(data);
        break;
    }
  };

  const zoneChangeHandler = (data: Zone, action: ActionMeta<Zone> | null) => {
    if (action === null) {
      addOption(data);
    }

    function addOption(data: Zone) {
      setSelectedValues(({ building, floor }) => ({ building, floor, zone: data }));
      form.setFieldsValue({ regal: '', shelf: '' });
    }

    switch (action?.action) {
      case 'clear':
        form.setFieldsValue({ zone: '', regal: '', shelf: '' });
        setSelectedValues((prev) => ({ ...prev, zone: null, regal: null, shelf: null }));
        break;

      case 'select-option':
        addOption(data);
        break;
    }
  };

  const regalChangeHandler = (data: Regal, action: ActionMeta<Regal> | null) => {
    if (action === null) {
      addOption(data);
    }

    function addOption(data: Regal) {
      setSelectedValues(({ building, floor, zone }) => ({ building, floor, zone, regal: data }));
      form.setFieldsValue({ shelf: '' });
    }

    switch (action?.action) {
      case 'clear':
        form.setFieldsValue({ regal: '', shelf: '' });
        setSelectedValues((prev) => ({ ...prev, regal: null, shelf: null }));
        break;

      case 'select-option':
        addOption(data);
        break;
    }
  };

  const shelfChangeHandler = (data: Shelf, action: ActionMeta<Shelf> | null) => {
    if (action === null) {
      addOption(data);
    }

    function addOption(data: Shelf) {
      setSelectedValues(({ building, floor, zone, regal }) => ({
        building,
        floor,
        zone,
        regal,
        shelf: data,
      }));
    }

    switch (action?.action) {
      case 'clear':
        form.setFieldsValue({ shelf: '' });
        setSelectedValues((prev) => ({ ...prev, shelf: null }));
        break;

      case 'select-option':
        addOption(data);
        break;
    }
  };

  // TODO: Improvement - focus on AntSelect Inputs when clicked on the label

  return (
    <FormStyle.Container
      form={form}
      layout="horizontal"
      colon={false}
      colspace={8}
      labelAlign="left"
      onFinish={formSubmitHandler}
      name="stock-storage-variation-form"
      labelCol={{ xs: { span: 8 } }}
      wrapperCol={{ xs: { span: 16 } }}
    >
      {/* TODO: ask someone about this */}
      {/* <Alert
        message={`${t('Stock.StorageVariation.VariationName')} : ${initialValues?.variation_name}`}
        type="success"
      /> */}

      <Row justify="space-between">
        <Col xs={24} lg={12} className="leftCol">
          <div className="box-container">
            <Alert message={`${t('Stock.StorageVariation.WarehouseId')} : ${warehouseId} `} type="info" />

            <Suspense fallback={FallbackSelect('Building')}>
              <Form.Item
                label={t('Stock.StorageVariation.Building')}
                name="building"
                rules={[{ required: true }]}
              >
                <BuildingSelect value={selectedValues?.building} onChange={buildingChangeHandler} />
              </Form.Item>
            </Suspense>

            <Suspense fallback={FallbackSelect('Floor')}>
              <Form.Item label={t('Stock.StorageVariation.Floor')} name="floor">
                <RelatedFloorSelect
                  value={selectedValues?.floor}
                  onChange={floorChangeHandler}
                  disabled={!selectedValues?.building}
                />
              </Form.Item>
            </Suspense>
          </div>
        </Col>

        <Col xs={24} lg={12} className="rightCol">
          <div className="box-container">
            <Suspense fallback={FallbackSelect('Zone')}>
              <Form.Item label={t('Stock.StorageVariation.Zone')} name="zone">
                <RelatedZoneSelect
                  value={selectedValues?.zone}
                  onChange={zoneChangeHandler}
                  disabled={!selectedValues?.floor}
                />
              </Form.Item>
            </Suspense>

            <Suspense fallback={FallbackSelect('Regal')}>
              <Form.Item label={t('Stock.StorageVariation.Regal')} name="regal">
                <RelatedRegalSelect
                  value={selectedValues?.regal}
                  onChange={regalChangeHandler}
                  disabled={!selectedValues?.zone}
                />
              </Form.Item>
            </Suspense>

            <Suspense fallback={FallbackSelect('Shelf')}>
              <Form.Item label={t('Stock.StorageVariation.Shelf')} name="shelf">
                <RelatedShelfSelect
                  value={selectedValues?.shelf}
                  onChange={shelfChangeHandler}
                  disabled={!selectedValues?.regal}
                />
              </Form.Item>
            </Suspense>
          </div>
        </Col>
      </Row>

      <FormSubmit title={t('Global.Create')} isPending={isPending} />
    </FormStyle.Container>
  );
};

const FallbackSelect: FC<string> = (title) => {
  const translation = i18n.t(`Stock.StorageVariation.${title}`);
  return (
    <Form.Item label={translation}>
      <Select isDisabled isLoading placeholder={i18n.t('Global.SelectPlaceholder', { title: translation })} />
    </Form.Item>
  );
};

export default StorageVariationForm;
