import React from "react";
import { Button, StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, Modal } from "react-native";

import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { MaterialIcons } from "@expo/vector-icons";
import StarRating from "react-native-star-rating-widget";
import { useNavigation } from "@react-navigation/native";

// type
import { ScreenNavigationProp } from "../type";

export default function TabReviewForm() {
  // location
  const [, setLocation] = useState("");

  // getting current date and time
  const currentDate = new Date();

  // description
  const [description, setDescription] = useState("");

  // add photo
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
                    />
                </View>
                <View style={styles.button}>
                    <Button
                    title="Choose from Gallery"
                    color="RGA0000"
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

  // rating
  const [rating, setRating] = useState(0);

  // post rating (submit button)
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <ScrollView>
        <View style={styles.container}>
      <Text style={styles.title}>New Bathroom Rating</Text>

      <View style={styles.dropdown}>
        <RNPickerSelect
          placeholder={{
            label: "select a location",
            value: null,
          }}
          onValueChange={(newLocation) => setLocation(newLocation)}
          items={[
            { label: "Location 1", value: "location1" },
            { label: "Location 2", value: "location2" },
          ]}
        />
        <MaterialIcons
          style={styles.icon}
          name="keyboard-arrow-down"
          size={17}
          color="white"
        />
      </View>

      <Text style={styles.subtext}>{currentDate.toLocaleString()}</Text>

      <TextInput
        style={styles.input}
        placeholder="write your description..."
        placeholderTextColor="#344f33"
        value={description}
        onChangeText={setDescription}
        multiline={true}
      />

      <View style={styles.button}>
        <Button
            title="Upload image"
            color="RGA0000"
            onPress={()=> {
                setModalVisible(true);
            }}
        />
      </View>
      <ImageUploader
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      <Text style={styles.subtext}>Rate Your Experience:</Text>
      <StarRating
        style={styles.starRating}
        rating={rating}
        onChange={setRating}
        enableHalfStar={false}
      />

      <View style={styles.button}>
        <Button
          title="Post Rating"
          color="RGA0000"
          onPress={() => {
            navigation.navigate("Main");
          }}
        />
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#afd6ae",
    color: "#344f33",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#344f33",
  },
  dropdown: {
    flexDirection: "row",
    color: "white",
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#344f33",
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
    color: "#344f33",
  },
  input: {
    borderWidth: 1,
    borderColor: "#344f33",
    borderRadius: 20,
    padding: 10,
    width: "85%",
    minHeight: 150,
    marginBottom: 20,
    color: "#344f33",
  },
  button: {
    fontSize: 17,
    backgroundColor: "#344f33",
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
});
