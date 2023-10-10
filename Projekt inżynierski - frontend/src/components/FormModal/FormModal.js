import React from "react";
import { Modal } from "antd";

export default function FormModal(props) {
  const { isVisible, confirmLoading, onCancel, children, title } = props;

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal
      title={title}
      open={isVisible}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
    >
      {children}
    </Modal>
  );
}
