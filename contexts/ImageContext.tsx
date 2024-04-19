// ImageContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImagePickerSuccessResult } from "expo-image-picker";

interface ImageContextType {
  images: ImagePickerSuccessResult[];
  addImage: (image: ImagePickerSuccessResult) => void;
  deleteImage: (uriToDelete: string) => void;
  setImages: (images: ImagePickerSuccessResult[]) => void;
}

const ImageContext = createContext<ImageContextType>({
  images: [],
  addImage: () => {},
  deleteImage: () => {},
  setImages: () => {},
});

export const useImages = () => useContext(ImageContext);

interface Props {
  children: ReactNode;
}

export const ImageProvider: React.FC<Props> = ({ children }) => {
  const [images, setImages] = useState<ImagePickerSuccessResult[]>([]);

  const addImage = (image: ImagePickerSuccessResult) => {
    setImages((prevImages) => [...prevImages, image]);
  };

  const deleteImage = (uriToDelete: string) => {
    setImages((prevImages) =>
      prevImages.filter((img) => img.assets?.[0].uri !== uriToDelete),
    );
  };

  return (
    <ImageContext.Provider value={{ images, addImage, deleteImage, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};
