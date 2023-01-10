import { FormInstance } from 'antd';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import IncomingItemsForm from '../components/IncomingItemsForm';
import { IncomingItems, IncomingItemsFormCtx, ItemsFormCtx } from '../model/incomingItems';
import { bookIncomingItems } from '../services/incomingItems';

const IncomingItemsUpsert = ({
  variation: variationId,
}: {
  variation?: number | undefined | null;
}): ReactElement => {
  const { mutate: book, isLoading: bookPending } = useMutation(bookIncomingItems);

  const handleFormSubmit = ({ data: formValues, form }: { data: IncomingItems; form: FormInstance }) => {
    const { items, delivery_date, ...restValues } = formValues;

    const normalizedDeliveryDate = delivery_date ? moment(delivery_date).format('YYYY-MM-DD') : '';
    const { currency, supplier, product_variation, storage_variation, expire_date, ...restItems } = items[0];

    const normalizedExpiredDate = expire_date ? moment(expire_date).format('YYYY-MM-DD') : '';
    const itemsFormCtx: [Partial<ItemsFormCtx>] = [
      {
        currency_id: currency?.id,
        supplier_id: supplier?.id,
        product_variation_id: variationId ?? product_variation?.id,
        storage_variation_id: storage_variation?.id,
        expire_date: normalizedExpiredDate,
        ...restItems,
      },
    ];

    const values: Partial<IncomingItemsFormCtx> = {
      items: itemsFormCtx,
      ...restValues,
      delivery_date: normalizedDeliveryDate,
    };

    book(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <IncomingItemsForm isPending={bookPending} onSubmit={handleFormSubmit} hasVariation={!!variationId} />
  );
};

export default IncomingItemsUpsert;
