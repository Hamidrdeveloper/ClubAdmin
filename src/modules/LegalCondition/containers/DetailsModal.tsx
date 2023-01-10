import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';

type Props = {
  visible: boolean;
  setVisible: (isVisible: boolean) => void;
  htmlData: string;
};

const DetailsModal = ({ htmlData, setVisible, visible }: Props): ReactElement => {
  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <Modal
      visible={visible}
      width={1300}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={closeHandler}
    >
      <div dangerouslySetInnerHTML={{ __html: htmlData }} />
    </Modal>
  );
};

export default DetailsModal;
