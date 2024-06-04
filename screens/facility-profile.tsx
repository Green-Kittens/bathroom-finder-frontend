import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
  TextStyle,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { ScreenNavigationProp } from "../navigation/type";
import Review from "../components/Review";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { SignedIn } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import MainButton, {
  LightButton,
  SecondaryButton,
} from "../components/Buttons";
import ViewMoreText from "react-native-view-more-text";
import { getAllReviews } from "../controllers/reviewController";
import { Facility as BathroomProfile } from "../types/facility";
import { Review as BathroomReview } from "../types/review";
import { getBathroomProfile } from "../controllers/bathroomController";

const windowHeight = Dimensions.get("window").height;

function CollapseView({
  hours,
  category,
  tags,
  description,
}: {
  hours: string;
  category: string;
  tags: string[];
  description: string;
}) {
  type onPressCallback = () => void;
  function renderViewMore(onPress: onPressCallback) {
    return renderPressableText("View more", onPress);
  }
  function renderViewLess(onPress: onPressCallback) {
    return renderPressableText("View less", onPress);
  }
  function renderPressableText(content: string, onPress: onPressCallback) {
    return MainButton(content, onPress, false, { fontSize: 12 } as TextStyle);
  }

  return (
    <ViewMoreText
      numberOfLines={3}
      renderViewMore={renderViewMore}
      renderViewLess={renderViewLess}
    >
      <Text>
        Hours: {hours} {"\n"}
        Category: {category} {"\n"}
        Tags: {tags.join(", ")} {"\n"}
        Description: {description} {"\n"}
      </Text>
    </ViewMoreText>
  );
}

// route type
type FacilityProfileRouteParams = { bathroom: BathroomProfile };
type FacilityProfileRouteProp = RouteProp<
  { FacilityProfile: FacilityProfileRouteParams },
  "FacilityProfile"
>;

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

interface ImageCarouselProps {
  images: { uri: string; id: string }[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImageUri, setSelectedImageUri] = useState("");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = 100;
  const margin = 10;
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
      <ScrollView
        horizontal={true}
        style={styles.horizontalScroll}
        scrollEnabled={shouldScroll} // Enable or disable scrolling based on the width of images
        showsHorizontalScrollIndicator={false}
      >
        {images.map((img) => (
          <Card
            key={img.id}
            imageSource={img.uri}
            onPress={() => openImageModal(img.uri)}
          />
        ))}
      </ScrollView>
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: selectedImageUri }} style={styles.modalImage} />
        </View>
      </Modal>
    </View>
  );
};

export default function TabFacilityProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();

  // route-- facility data
  const route = useRoute<FacilityProfileRouteProp>();
  const { bathroom } = route.params;

  // fetching all bathroom reviews
  const [bathroomReviews, setBathroomReviews] = useState<BathroomReview[]>([]);
  const fetchReviews = async () => {
    try {
      const fetchReviews = await getAllReviews(bathroom._id);
      setBathroomReviews(fetchReviews);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchReviews();
    }, []),
  );

  useEffect(() => {
    fetchReviews();
    const interval = setInterval(fetchReviews, 30000); // Fetch reviews every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  console.log(`Fetched Bathroom Reviews: ${bathroomReviews}`);
  console.log(`Current facility ID: ${bathroom._id}`);

  // unique ids for images
  const imagesWithIds = bathroom.PictureURL.map((url, index) => ({
    uri: url,
    id: `${bathroom._id}-${index}`,
  }));

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={[{ flex: 0.9, alignItems: "center", backgroundColor: "none" }]}
        >
          <ImageBackground
            source={require("../assets/images/blob.png")}
            style={{
              width: 500,
              height: windowHeight,
              position: "absolute",
              top: 300,
              left: -100,
            }}
            imageStyle={{
              resizeMode: "cover",
              alignSelf: "flex-end",
            }}
          ></ImageBackground>
          <Text style={styles.title}>{bathroom.Name}</Text>

          <ImageCarousel images={imagesWithIds} />
          <View
            style={[
              {
                flex: 1,
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "none",
                paddingVertical: 10,
              },
            ]}
          >
            <StarRatingDisplay rating={bathroom.RatingAVG} color="black" />
            <Text style={styles.body}> 5.0 stars</Text>
          </View>
        </View>
        <View
          style={[{ flex: 1, marginHorizontal: 40, backgroundColor: "none" }]}
        >
          <SignedIn>
            <View style={{ marginTop: 10 }}>
              {SecondaryButton("Add Review", () => {
                // figure out how to make it so that dropdown renders current facility as location
                navigation.navigate("ReviewForm", { bathroom });
              })}
            </View>
          </SignedIn>
        </View>

        <View
          style={{
            overflow: "hidden",
            backgroundColor: "none",
            marginHorizontal: "6%",
          }}
        >
          <View style={{ paddingVertical: "5%" }}>
            <CollapseView
              hours={bathroom.Operations}
              category={bathroom.Category}
              tags={bathroom.Tags}
              description={bathroom.Description}
            />
          </View>

          <View>
            <LinearGradient
              colors={["#6da798", "#40a4a9"]}
              end={{ x: 0.1, y: 0.2 }}
              style={[{ padding: 20, borderRadius: 15 }]}
            >
              <View
                style={[
                  {
                    flex: 1,
                    padding: 10,
                    alignItems: "center",
                    backgroundColor: "none",
                  },
                ]}
              >
                {Review()}
                <View style={[{ backgroundColor: "none", minWidth: 200 }]}>
                  {LightButton("See more", () => {
                    navigation.navigate("FacilityReviews", { bathroomReviews });
                  })}
                </View>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF8F7",
  },
  image: {
    flex: 1,
  },
  outer_body_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 40,
  },

  body_container: {
    flex: 0.5,
    alignItems: "flex-start",
    justifyContent: "center",
    marginHorizontal: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "EudoxusSans-Bold",
  },
  body: {
    fontSize: 15,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    alignSelf: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 14,
  },
  row: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "none",
  },
  review: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "none",
  },
  toprow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "none",
  },
  button: {
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 60,
    paddingVertical: 10,
    width: "80%",
  },
  smallbutton: {
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 4,
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});
