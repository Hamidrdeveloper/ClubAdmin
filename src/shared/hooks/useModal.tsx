import { Loader } from '@src/shared/components';
import { Modal } from 'antd';
import React, { Dispatch, ReactElement, SetStateAction, Suspense, useCallback, useState } from 'react';

type paramProps = {
  content: ReactElement;
};
type returnProps = {
  Modal: ReactElement;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

const useModal = ({ content }: paramProps): returnProps => {
  const [isVisible, setVisible] = useState<boolean>();

  const handleClose = useCallback(() => {
    return setVisible(false);
  }, []);

  const customModal = (
    <Modal width={1300} closable footer={null} destroyOnClose visible={isVisible} onCancel={handleClose}>
      <Suspense fallback={<Loader />}>{React.cloneElement(content)}</Suspense>
    </Modal>
  );

  return { setVisible, Modal: customModal };
};

export default useModal;
