import axios from "axios";
import { port, host, protocol } from "./env";
import { Alert } from "react-native";
import { ImagePickerAsset } from "expo-image-picker";

/**
 * Upload a new image to Azure
 * @returns {string} - the file name in the Azure images container
 */
export async function uploadImage(image: ImagePickerAsset): Promise<string> {
  try {
    const form = new FormData();
    if (image.base64 === undefined || image.base64 === null)
      throw "image null or undefined";

    form.append("image", image.base64);

    const res = await axios.put(`${protocol}://${host}:${port}/images/`, form);
    return res.data;
  } catch (error) {
    Alert.alert("Error uploading image", JSON.stringify(error));
    throw error;
  }
}
