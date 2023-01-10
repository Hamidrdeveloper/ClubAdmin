import { Button, Space } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  action: number;
  orderId: number;
  quantity: number;
  pickedData: { positionId: number; picked: number }[] | undefined;
  setPickedData: (picked: { positionId: number; picked: number }[] | undefined) => void;
  setComplete: (complete: number | ((complete: number) => number)) => void;
};

function PickerActionComponent({
  action,
  quantity,
  orderId,
  pickedData,
  setPickedData,
  setComplete,
}: Props): ReactElement {
  const [value, setValue] = useState<number>(action);
  const { t } = useTranslation();
  //
  useEffect(() => {
    if (value >= quantity) {
      setComplete((prev) => prev + 1);
    } else if (value === -1) {
      setComplete((prev) => prev - 1);
      setValue(0);
    }
    //
    const cPickedData = pickedData ?? [];
    if (!cPickedData.find((pick) => pick.positionId === orderId))
      cPickedData.push({ positionId: orderId, picked: value });
    else cPickedData[cPickedData.findIndex((pick) => pick.positionId === orderId)].picked = value;
    localStorage.setItem('PickerDashboard', JSON.stringify(cPickedData));
    setPickedData(cPickedData);
  }, [value]);

  //
  return value >= quantity ? (
    <span>
      {t('PickerDashboard.Picked')}{' '}
      <Button size="large" onClick={() => setValue(-1)}>
        {t('PickerDashboard.Cancel')}
      </Button>
    </span>
  ) : (
    <Space direction="horizontal" style={{ alignItems: 'baseline' }}>
      <Button
        size="large"
        onClick={() => {
          setValue((v) => (v - 1 >= 0 ? v - 1 : v));
        }}
      >
        -
      </Button>
      <h3>{value}</h3>
      <Button
        size="large"
        onClick={() => {
          setValue((v) => (v + 1 <= quantity ? v + 1 : v));
        }}
      >
        +
      </Button>
    </Space>
  );
}

export default PickerActionComponent;
