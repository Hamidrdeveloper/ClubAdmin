/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { LoadingOutlined } from '@ant-design/icons';
import { usePageLayout } from '@src/shared/components';
import { CallbackPromise, FactoryModule } from '@src/shared/models';
import { Checkbox } from 'antd';
import React, { Key, ReactElement, useState } from 'react';

interface DefaultProps<T> {
  id: number;
  checked: boolean;
  module?: FactoryModule<T>;
  refetch: CallbackPromise<T>;
  url: string;
  dataIndex: string;
  disabled?: boolean;
}

export function UpdateProperty<T>({
  id,
  url,
  module,
  checked,
  refetch,
  dataIndex,
  disabled = false,
}: DefaultProps<T>): ReactElement {
  const [isPending, setPending] = useState(false);

  const toggleHandler = () => {
    setPending(true);

    module?.apiService
      .then(refetch)
      .finally(() => setPending(false));
  };

  return isPending ? (
    <LoadingOutlined />
  ) : (
    <Checkbox disabled={disabled} checked={checked} onChange={toggleHandler} />
  );
}

// FIXME: This method was a quick fix, consider changing the Behavior from backend
interface updateDefaultProps<T> {
  id: number;
  url: string;
  checked: boolean;
  module?: FactoryModule<T>;
  refetch: CallbackPromise<T>;
}

export function UpdateDefault<T>({ id, url, checked, refetch, module }: updateDefaultProps<T>): ReactElement {
  const [isPending, setPending] = useState(false);

  const toggleHandler = () => {
    setPending(true);

    module?.apiService
      .updateDefault(id, url)
      .then(refetch)
      .finally(() => setPending(false));
  };

  return isPending ? <LoadingOutlined /> : <Checkbox checked={checked} onChange={toggleHandler} />;
}

interface GetOneProps<T> {
  id: number;
  module?: FactoryModule<T>;
  customUrl: string | undefined;
}

export function GetOne<T>({ id, module, customUrl }: GetOneProps<T>): ReactElement {
  const [isPending, setPending] = useState(false);
  const { setSingleData, setModalVisible } = usePageLayout();

  const prepareEdit = (id: number) => {
    setPending(true);
    module?.apiService
      .getOne(id, customUrl)
      .then((data: T) => {
        if (data) {
          setSingleData(data);
          setModalVisible(true);
        }
      })
      .finally(() => setPending(false));
  };

  return (
    <span id="id" onClick={() => prepareEdit(id)}>
      {id} {isPending && <LoadingOutlined style={{ marginLeft: 4 }} />}
    </span>
  );
}

interface DeleteRowProps<T> {
  url?: string;
  selectedRowIds: Key[];
  module: FactoryModule<T>;
  refetch?: CallbackPromise<T>;
}

export function DeleteRows<T>({
  module,
  selectedRowIds,
  url = '/bulk-delete',
}: DeleteRowProps<T>): Promise<T> {
  return module.apiService.bulkDelete(selectedRowIds, url);
}
