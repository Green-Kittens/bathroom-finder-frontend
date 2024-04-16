import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import DisplayImage from "./DisplayImage";

interface CardProps {
  imageSource: string;
  onPress: () => void;
}

const Card: React.FC<CardProps> = ({ imageSource, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: imageSource }} style={styles.cardImage} />
      </View>
    </TouchableOpacity>
  );
};

interface HorizontalCardsProps {
  images: string[];
  onDelete: (uri: string) => void;
}

const HorizontalCards: React.FC<HorizontalCardsProps> = ({ images, onDelete }) => {

  // Get the screen width from Dimensions
  const screenWidth = Dimensions.get("window").width;

  // Each card width plus some margin, adjust margin as needed
  const cardWidth = 100; // width of each card
  const margin = 10; // total horizontal margin around each card
  const totalCardWidth = images.length * (cardWidth + margin);

  // Determine if scrolling is necessary
  const shouldScroll = totalCardWidth > screenWidth;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  const openImageModal = (uri: string) => {
    setSelectedImageUri(uri);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Uploaded Images</Text>
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        scrollEnabled={shouldScroll} // Enable or disable scrolling based on the width of images
        showsHorizontalScrollIndicator={shouldScroll}
      >
        {images.map((imageSource, index) => (
          <Card
            key={index.toString()}
            imageSource={imageSource}
            onPress={() => openImageModal(imageSource)}
          />
        ))}
      </ScrollView>
      <DisplayImage
        isVisible={modalVisible}
        imageUri={selectedImageUri}
        onClose={closeImageModal}
        onDelete={() => onDelete(selectedImageUri)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  horizontalScroll: {
    marginVertical: 10,
  },
  card: {
    width: 100,
    height: 150,
    borderRadius: 10,
    borderColor: "black",
    backgroundColor: "grey",
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});

export { HorizontalCards, Card };
