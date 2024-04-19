import React, {useState} from "react";
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
import { useImages } from "../contexts/ImageContext";
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


const HorizontalCards: React.FC = () => {
  const { images, deleteImage } = useImages();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");


  // Get the screen width from Dimensions 
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = 100; // width of each card
  const margin = 10; // total horizontal margin around each card
  const totalCardWidth = images.length * (cardWidth + margin);
  const shouldScroll = totalCardWidth > screenWidth;

  
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
        showsHorizontalScrollIndicator={false}
      >
        {images.map((img, index) => (
          <Card
            key={index.toString()}
            imageSource={img.assets[0].uri}
            onPress={() => openImageModal(img.assets[0].uri)}
          />
        ))}
      </ScrollView>
      <DisplayImage
        isVisible={modalVisible}
        imageUri={selectedImageUri}
        onClose={closeImageModal}
        onDelete={() => {
          deleteImage(selectedImageUri);
          closeImageModal();
        }}
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
