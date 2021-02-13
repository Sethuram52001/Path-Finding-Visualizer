import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

const ErrorModal = () => {

  return (
    <div>
      <Modal isOpen={true}>
        <ModalHeader style={{color: 'black'}}>Path is not found</ModalHeader>
      </Modal>
    </div>
  );
}

export default ErrorModal;
