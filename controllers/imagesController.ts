import axios, { AxiosError } from "axios";
import { port, host, protocol } from "./env";
import { Alert, Platform } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";

/**
 * Upload a new image to Azure
 * @returns {string} - the file name in the Azure images container
 */
export async function uploadImage(image: ImagePickerAsset): Promise<string> {
  try {
    const form = new FormData();

    form.append("image", {
      name: image.fileName || "photo.jpg",
      type: image.type || "image/jpg",
      uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
    } as any);

    const res = await axios.put(`${protocol}://${host}:${port}/images/`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      Alert.alert("AxiosError uploadImage", JSON.stringify(error.response));
      console.error(error.response);
      console.error(error.response?.request);
    } else {
      Alert.alert("Error uploading image", JSON.stringify(error));
    }
    return Promise.reject();
  }
}
