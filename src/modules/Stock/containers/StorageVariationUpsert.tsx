import { usePageLayout } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { FormInstance } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, ReactElement, useEffect } from 'react';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import StorageVariationForm, { selectedStorageVariationFieldsAtom } from '../components/StorageVariationForm';
import { StorageVariation } from '../model/storageVariation';
import { warehouseIdAtom } from '../pages/StockManage.page';
import { StorageVariationModule } from '../Stock.module';

const StorageVariationUpsert: FC<GlobalUpsertProps<StorageVariation>> = ({ onCallback }): ReactElement => {
  const [warehouseId] = useAtom(warehouseIdAtom);
  if (!warehouseId) return <Fallback />;
  const { setRequestUpdate } = usePageLayout();
  const module = new StorageVariationModule();
  const [, setSelectedStorageVariationFields] = useAtom(selectedStorageVariationFieldsAtom);

  useEffect(() => {
    return () => {
      setSelectedStorageVariationFields({});
    };
  }, []);

  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<StorageVariation>) => {
    return module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: StorageVariation, form: FormInstance) => {
    const { building, floor, zone, regal, shelf, ...restValues } = formValues;
    const values: Partial<StorageVariation> = {
      ...restValues,
      warehouse_id: +warehouseId,
      building_id: building?.id,
      floor_id: floor?.id,
      zone_id: zone?.id,
      regal_id: regal?.id,
      shelf_id: shelf?.id,
    };

    mutate(
      { values },
      {
        onSuccess: (data: StorageVariation) => {
          form.resetFields();
          onCallback?.(data);
          setRequestUpdate(true);
          setSelectedStorageVariationFields({});
        },
      },
    );
  };
  return <StorageVariationForm isPending={isLoading} onSubmit={handleFormSubmit} />;
};

export default StorageVariationUpsert;
