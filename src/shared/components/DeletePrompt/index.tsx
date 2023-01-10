import i18n from '@src/core/i18n/config';
import { Popconfirm } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React, { ReactElement, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  onConfirm: () => unknown;
  placement?: TooltipPlacement;
};
const DeletePrompt = ({
  children,
  onConfirm,
  isDisabled = false,
  placement = 'bottom',
}: Props): ReactElement => {
  return (
    <Popconfirm
      placement={placement}
      disabled={isDisabled}
      onConfirm={onConfirm}
      okText={i18n.t('Global.Yes')}
      cancelText={i18n.t('Global.Cancel')}
      title={i18n.t('Global.DeleteSelectedRows?')}
    >
      {children}
    </Popconfirm>
  );
};

export default DeletePrompt;
