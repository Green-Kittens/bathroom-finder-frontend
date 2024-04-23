// DisplayImage.tsx

import React from "react";
import { Modal, View, Image, StyleSheet } from "react-native";
import { CancelButton } from "./Buttons"; // Adjust the import path as needed

interface DisplayImageProps {
  isVisible: boolean;
  imageUri: string;
  onClose: () => void;
  onDelete: () => void;
}

const DisplayImage: React.FC<DisplayImageProps> = ({
  isVisible,
  imageUri,
  onClose,
  onDelete,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image style={styles.modalImage} source={{ uri: imageUri }} />
          {CancelButton("Cancel", onClose)}
          {CancelButton("Delete", onDelete)}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 300,
    height: 300,
    resizeMode: "center",
  },
});

export default DisplayImage;
