import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationProp } from "../type";
import Review from "../../components/Review";
import { StarRatingDisplay } from "react-native-star-rating-widget";

import { LinearGradient } from "expo-linear-gradient";
import MainButton, { LightButton } from "../../components/Buttons";

import ViewMoreText from "react-native-view-more-text";

const windowHeight = Dimensions.get("window").height;

function CollapseView() {
  type onPressCallback = () => void;
  function renderViewMore(onPress: onPressCallback) {
    return renderPressableText("View more", onPress);
  }
  function renderViewLess(onPress: onPressCallback) {
    return renderPressableText("View less", onPress);
  }
  function renderPressableText(content: string, onPress: onPressCallback) {
    return (
      <Text onPress={onPress} style={{ color: "#6da798" }}>
        {content}
      </Text>
    );
  }

  return (
    <View
      style={{
        overflow: "hidden",
        backgroundColor: "none",
        marginHorizontal: "3%",
      }}
    >
      <ViewMoreText
        numberOfLines={3}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
      >
        <Text>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </Text>
      </ViewMoreText>
    </View>
  );
}

export default function TabFacilityProfileScreen() {
  // navigation
  const navigation = useNavigation<ScreenNavigationProp>();
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
          <Text style={styles.title}>Facility Name</Text>
          <Image
            source={{
              uri: "https://images.adsttc.com/media/images/6179/94c7/f91c/81a4/f700/00c2/newsletter/WMC-Expo-2---Architectural-Photographer-Michael-Tessler---11.jpg?1635357877",
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
            <StarRatingDisplay rating={5} color="black" />
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
        <CollapseView />

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
                  navigation.navigate("FacilityReviews");
                })}
              </View>
            </View>
          </LinearGradient>
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
});
