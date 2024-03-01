import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function horizontalCards(title: string) {
  return (
    <View style={[{ justifyContent: "center", alignItems: "center" }]}>
      <Text style={{ margin: 10, alignSelf: "flex-start", marginLeft: "15%" }}>
        {title}
      </Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {bufferCard()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {bufferCard()}
      </ScrollView>
    </View>
  );
}

function card() {
  return <View style={styles.card} />;
}
function bufferCard() {
  return <View style={styles.buffercard} />;
}

const styles = StyleSheet.create({
  horizontalScroll: {width: "100%"},
  card: {
    width: 120,
    height: 200,
    borderRadius: 10,
    backgroundColor: "grey",
    marginHorizontal: 5,
  },
  buffercard: {
    width: 30,
    height: 200,
    borderRadius: 10,
    backgroundColor: "none",
    marginHorizontal: 5,
  },
});
