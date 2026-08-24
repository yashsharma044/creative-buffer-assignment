import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { getHeight, getWidth } from "../libs/StyleHelper";
import { colors } from "../constants/colors";

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  visible,
  title,
  message,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: ConfirmationModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <View style={styles.actions}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={onConfirm}
            >
              <Text style={styles.deleteText}>{confirmText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: getWidth(24),
    backgroundColor: colors.overlayBackground,
  },

  modal: {
    width: "100%",
    maxWidth: getWidth(400),
    padding: getWidth(22),
    borderRadius: getWidth(16),
    backgroundColor: colors.cardBackground,
  },

  title: {
    fontSize: getHeight(20),
    fontWeight: "700",
    color: colors.textPrimary,
  },

  message: {
    marginTop: getHeight(10),
    fontSize: getHeight(14),
    lineHeight: getHeight(21),
    color: colors.textSecondary,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: getWidth(10),
    marginTop: getHeight(24),
  },

  button: {
    minWidth: getWidth(90),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: getHeight(10),
    paddingHorizontal: getWidth(16),
    borderRadius: getWidth(8),
  },

  cancelButton: {
    backgroundColor: colors.cancelButtonBackground,
  },

  deleteButton: {
    backgroundColor: colors.deleteButtonBackground,
  },

  cancelText: {
    fontSize: getHeight(14),
    fontWeight: "600",
    color: colors.textMuted,
  },

  deleteText: {
    fontSize: getHeight(14),
    fontWeight: "600",
    color: colors.buttonText,
  },
});
