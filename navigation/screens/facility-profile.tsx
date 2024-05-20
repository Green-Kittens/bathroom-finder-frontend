import React from "react";
import {
  StyleSheet,
  Animated,
  Image,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
  Dimensions,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { ScreenNavigationProp } from "../type";
import Review from "../../components/Review";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { LinearGradient } from "expo-linear-gradient";
import MainButton, { LightButton } from "../../components/Buttons";
import { Facility as BathroomProfile } from "../../types/facility";
import { getAllReviews } from "../../controllers/reviewController";
import { Review as BathroomReview } from "../../types/review"

const maxLineNumber = 5;
const windowHeight = Dimensions.get("window").height;

// ask why there is no description param for BathroomProfile
// TODO: review button should navigate to bathroom's review page 
// collect all reviews for bathroom

function CollapseView(
  { hours, category, tags, reviews }: { hours: string, category: string, tags: string[], reviews: BathroomReview[] },
) {
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 100,
      toValue: 80,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    setMaxLines(maxLineNumber);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 1000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  const changeText = () => {
    if (collapsed) {
      return "Expand";
    } else {
      return "Collapse";
    }
  };

  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();

  return (
    <View style={{ overflow: "hidden", backgroundColor: "none" }}>
      <Animated.View style={{ maxHeight: animationHeight }}>
        <Text
          style={[
            styles.paragraph,
            { backgroundColor: "#CDEEEA", padding: 20 },
          ]}
          numberOfLines={maxLines}
        >
          Hours: { hours } {"\n"} 
          Category: { category } {"\n"}
          Tags: { tags.join(', ') } {"\n"}
          {/* { description } */} 
        </Text>
      </Animated.View>
      <LinearGradient
        // Button Linear Gradient
        colors={["#6da798", "#40a4a9"]}
        end={{ x: 0.1, y: 0.2 }}
        style={styles.button}
      >
        <Pressable
          style={[{ width: "100%", alignItems: "center" }]}
          onPress={toggleCollapsed}
        >
          <Text style={[styles.body, { fontWeight: "bold" }]}>
            {changeText()}
          </Text>
        </Pressable>
      </LinearGradient>

      <View style={{}}>
        <View style={styles.separator} />
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
                navigation.navigate("FacilityReviews", { reviews });
              })}
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

// route type 
type FacilityProfileRouteParams = { bathroom: BathroomProfile };
type FacilityProfileRouteProp = RouteProp<{ FacilityProfile: FacilityProfileRouteParams }, 'FacilityProfile'>;

export default function TabFacilityProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();

  // route-- facility data
  const route = useRoute<FacilityProfileRouteProp>();
  const { bathroom } = route.params;

   // fetching all bathroom reviews
   const [bathroomReviews, setBathroomReviews] = useState<BathroomReview[]>([]);
   useEffect(() => {
    (async () => {
      try {
        const fetchReviews = await getAllReviews(bathroom.ID);
        setBathroomReviews(fetchReviews);
        console.log(fetchReviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    })();
   }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={[{ flex: 0.9, alignItems: "center", backgroundColor: "none" }]}
        >
          <ImageBackground
            source={require("../../assets/images/blob.png")}
            style={{
              width: 953,
              height: windowHeight,
              position: "absolute",
              top: 100,
              left: -200,
            }}
            imageStyle={{
              resizeMode: "cover",
              alignSelf: "flex-end",
            }}
          ></ImageBackground>
          <Text style={styles.title}>{ bathroom.Name }</Text>
          <Image
            source={{
              uri: bathroom.PictureURL, // not rendering-- check if image link is good
              // uri: "https://images.adsttc.com/media/images/6179/94c7/f91c/81a4/f700/00c2/newsletter/WMC-Expo-2---Architectural-Photographer-Michael-Tessler---11.jpg?1635357877",
            }}
            style={{ height: 250, width: 250 }}
          />
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
            <StarRatingDisplay rating={ bathroom.RatingAVG } color="black" />
            <Text style={styles.body}> 5.0 stars</Text>
          </View>
        </View>
        <View
          style={[{ flex: 1, marginHorizontal: 40, backgroundColor: "none" }]}
        >
          <View style={{ marginTop: 10 }}>
            {MainButton("Add Review", () => {
              // figure out how to make it so that dropdown renders current facility as location
              navigation.navigate("ReviewForm");
            })}
          </View>
        </View>
        <CollapseView 
        hours={ bathroom.Operations }
        category= {bathroom.Category }
        tags= { bathroom.Tags }
        reviews={ bathroomReviews }
         />
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
});
