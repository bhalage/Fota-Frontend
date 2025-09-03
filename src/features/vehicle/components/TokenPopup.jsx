import React from "react";
import { Modal, Typography, Button, message } from "antd";

const { Title, Paragraph } = Typography;

const TokenPopup = ({ isOpen, onClose, token }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(token);
    message.success("Copied to clipboard!");
  };

  return (
    <Modal
      title={<Title level={4} style={{ margin: 0 }}>Vehicle Access Token</Title>}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button key="copy" type="primary" onClick={handleCopy}>
          Copy
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      centered
      width={600}
    >
      <Paragraph
        code
        style={{
          maxHeight: 160,
          overflowY: "auto",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          background: "#f5f5f5",
          padding: "12px",
          borderRadius: "6px",
        }}
      >
        {token}
      </Paragraph>
    </Modal>
  );
};

export default TokenPopup;
