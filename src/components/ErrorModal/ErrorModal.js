import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';

const ErrorModal = (props) => {
  const {
    className
  } = props;

  return (
    <div>
      <Modal isOpen={true} className={className}>
        <ModalHeader>Path not found</ModalHeader>
      </Modal>
    </div>
  );
}

export default ErrorModal;
