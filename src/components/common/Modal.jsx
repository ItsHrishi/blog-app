import React from "react";
import { Box, Button, Flex, Text } from "@radix-ui/themes";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  type = "default",
  confirmText = "Confirm",
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null; // Don't render if the modal is not open

  const typeColor = type === "delete" ? "red" : "blue"; // Set color based on type

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "var(--accent-1)",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "450px",
          width: "90%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box className="mb-2">
          <Text
            as="h3"
            weight="bold"
            className="text-lg sm:text-xl  lg:text-xl"
          >
            {title}
          </Text>
        </Box>
        <Box>
          <Text as="p" weight="regular" className="text-sm sm:text-base mb-2">
            {description}
          </Text>
        </Box>
        <Flex gap="3" justify="end">
          {/* Cancel Button */}
          <Button variant="soft" color="gray" onClick={onClose}>
            Cancel
          </Button>

          {/* Confirm Button */}
          <Button
            variant="solid"
            color={typeColor}
            onClick={() => {
              onConfirm();
              onClose();
            }}
            loading={loading}
          >
            {confirmText}
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default Modal;
