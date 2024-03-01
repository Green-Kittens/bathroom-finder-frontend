import React from "react";
import { StyleSheet, TextInput, ImageBackground, Text, View } from "react-native";
import MainButton from "../../components/Buttons";
import { ScrollView, Modal, Linking, Alert, TouchableOpacity } from "react-native";

import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import StarRating from "react-native-star-rating-widget";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

// type
import { ScreenNavigationProp } from "../type";

export default function TabReviewForm() {
  // location
  const [, setLocation] = useState("");

  // getting current date and time
  const currentDate = new Date();

  // description
  const [description, setDescription] = useState("");

  // add photo modal
  const [modalVisible, setModalVisible] = useState(false);
  const ImageUploader = ({ isVisible, onClose }) => {
    return(
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={onClose}
    >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.button}>
                    <Button
                    title="Take Photo"
                    color="RGA0000"
                    onPress={addUsingCamera}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Choose from Gallery"
                    color="RGA0000"
                    onPress={addFromGallery}
                    />
                </View>
                <View style={styles.cancelButton}>
                    <Button
                    title="Cancel"
                    color="RGA0000"
                    onPress={() => {
                        onClose();
                    }}
                    />
                </View>
            </View>
        </View>
    </Modal>
    );
  }

  // images uploaded for review
  const [images, setImages] = useState<Array<ImagePicker.ImagePickerSuccessResult>>(([]));

  // permissions 
  const [cameraStatus, cameraPermissions] = ImagePicker.useCameraPermissions();
  const [galleryAccessStatus, galleryPermissions] = ImagePicker.useMediaLibraryPermissions();

  // add photo from device gallery
  const addFromGallery = async () => {
    if (galleryAccessStatus?.status !== 'granted') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('gallery access permission denied');
            return;
        }
    }
    let _image = await ImagePicker.launchImageLibraryAsync(
        {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1,
        }
    );
    if (!_image.canceled) {
        images.push(_image);
        setModalVisible(false);
    }
  }

  // add photo using camera
  const addUsingCamera = async () => {
    if (cameraStatus?.status !== 'granted') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('camera permission denied');
            return;
        }
    }
    let _image = await ImagePicker.launchCameraAsync(
        {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            quality: 1,
        }
    );
    if (!_image.canceled) {
        images.push(_image);
        setModalVisible(false);
    }
  }

  // delete uploaded image
  const deleteImage = (toDelete) => {
    const updatedImages = images.filter((curr) => curr !== toDelete);
    setImages(updatedImages);
  }

  // rating
  const [rating, setRating] = useState(0);

  // post rating (submit button)
  const circleimage = { uri: "/assets/images/circle.png" };

  return (
    <View style={styles.container}>
            <ImageBackground
        source={circleimage}
        style={{
          width: 1070,
          height: 1000,
          position: "absolute",
          top: 550,
          left: -200,
        }}
        imageStyle={{
          resizeMode: "cover",
          alignSelf: "flex-end",
        }}
      ></ImageBackground>
      <Text style={styles.title}>New Bathroom Rating</Text>

      <View style={styles.dropdown}>
        <RNPickerSelect
          placeholder={{
            label: "select a location",
            value: undefined,
          }}
          onValueChange={(newLocation) => setLocation(newLocation)}
          items={[
            { label: "Location 1", value: "location1" },
            { label: "Location 2", value: "location2" },
          ]}
        />
      </View>

      <Text style={styles.subtext}>
        {currentDate.toLocaleString(navigator.language, {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </Text>
      <View style={styles.input}>
      <TextInput
        style={styles.input}
        placeholder="write your description..."
        placeholderTextColor="#6da798"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />
      <View style={styles.button}>
                {images.length === 3 && (
                    <Text style={styles.errorText}>
                        You can only upload a max of 3 photos.
                    </Text>
                )}
                {images.length < 3 && (
                    <Button
                        title="Upload image"
                        color="RGA0000"
                        onPress={()=> {
                            setModalVisible(true);
                        }}
                    />
                )}
            </View>

            <ImageUploader
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
            />

            {images.length !== 0 && (
                images.map((currImage, idx) => (
                    <View key={idx} style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => Linking.openURL(currImage.assets[0].uri)}>
                            <Text style={styles.imageLink}>{currImage.assets[0].fileName}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteImage(currImage)}>
                            <MaterialIcons name="delete" size={20} color="gray" />
                        </TouchableOpacity>
                    </View>
                ))
            )}
      </View>

      <Text style={[styles.subtext, { color: "black" }]}>
        Rate Your Experience:
      </Text>
      <StarRating
        style={styles.starRating}
        rating={rating}
        onChange={setRating}
        enableHalfStar={false}
        color="FFFFFF"
      />

      {MainButton("Post Rating", () => {
                    // make a check to make sure that all fields are filled out
                    navigation.navigate("Main");
                })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  dropdown: {
    flexDirection: "row",
    color: "white",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CDEEEA",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  icon: {
    marginLeft: "auto",
  },
  subtext: {
    fontSize: 17,
    marginBottom: 20,
    color: "#6da798",
  },
  input: {
    backgroundColor: "#CDEEEA",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    minHeight: 150,
    marginBottom: 20,
  },
  button: {
    fontSize: 17,
    backgroundColor: "#6da798",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  cancelButton: {
    fontSize: 17,
    backgroundColor: "#FF0000",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  starRating: {
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageLink: {
    marginRight: 10,
    color: "blue",
  },
});
