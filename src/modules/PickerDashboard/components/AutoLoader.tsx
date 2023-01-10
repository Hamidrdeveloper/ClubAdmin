import { ExclamationCircleTwoTone } from '@ant-design/icons';
import { Loader } from '@src/shared/components';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AutoState } from '../pages/PickerDashboard';

type Props<T> = {
  children: ReactElement;
  data: [AutoState<T>, (data: AutoState<T>) => void];
  service: () => Promise<T>;
};
//
function AutoLoader<Type>({ data: [get, set], service, children }: Props<Type>): ReactElement {
  const { t } = useTranslation();
  useEffect(() => {
    if (!get) {
      service()
        .then(set)
        .catch(() => set(undefined));
    }
  }, [get]);

  return get === undefined ? (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#FFCDD2',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        borderRadius: '16px',
      }}
    >
      <ExclamationCircleTwoTone style={{ fontSize: 48, marginBottom: '8px' }} twoToneColor={'#FF5252'} />
      <h3 style={{ color: '#FF5252', marginBottom: '-4px', marginLeft: '4px' }}>
        {t('PickerDashboard.Featching')}
      </h3>
      {/* <Collapse ghost>
        <Collapse.Panel header="More Technical Info" key="1">
          <p>{error}</p>
        </Collapse.Panel>
      </Collapse> */}
    </div>
  ) : get === null ? (
    <Loader />
  ) : (
    children
  );
}

export default AutoLoader;
