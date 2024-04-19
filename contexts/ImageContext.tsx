// ImageContext.tsx

import React, { createContext, useState, useContext, ReactNode } from "react";
import { ImagePickerSuccessResult } from "expo-image-picker";

interface ImageStore {
  images: ImagePickerSuccessResult[];
  addImage: (image: ImagePickerSuccessResult) => void;
  deleteImage: (uriToDelete: string) => void;
  setImages: (images: ImagePickerSuccessResult[]) => void;
}

interface ImageContextType {
  [key: string]: ImageStore; // Store image collections indexed by a key
}

const ImageContext = createContext<ImageContextType>({});

export const useImages = (id: string) => {
  const context = useContext(ImageContext);
  if (!context[id]) {
    // If the context does not already have an entry for this ID, initialize it
    context[id] = {
      images: [],
      addImage: (image: ImagePickerSuccessResult) => {
        context[id].images = [...context[id].images, image];
      },
      deleteImage: (uriToDelete: string) => {
        context[id].images = context[id].images.filter(
          (img) => img.assets?.[0].uri !== uriToDelete,
        );
      },
      setImages: (images: ImagePickerSuccessResult[]) => {
        context[id].images = images;
      },
    };
  }
  return context[id];
};

interface Props {
  children: ReactNode;
}

export const ImageProvider: React.FC<Props> = ({ children }) => {
  const [stores, setStores] = useState<ImageContextType>({});

  return (
    <ImageContext.Provider value={stores}>{children}</ImageContext.Provider>
  );
};
