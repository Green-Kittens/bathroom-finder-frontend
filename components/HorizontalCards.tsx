import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function horizontalCards(title: string) {
  return (
    <View>
      <Text style={{ margin: 10 }}>{title}</Text>
      <ScrollView horizontal={true} style={styles.horizontalScroll}>
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
        {card()}
      </ScrollView>
    </View>
  );
}

function card() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  horizontalScroll: {},
  card: {
    width: 120,
    height: 200,
    borderRadius: 10,
    backgroundColor: "grey",
    marginHorizontal: 5,
  },
});
