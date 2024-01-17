import React from "react";
import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Header({ screen }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={headerStyles.container}>
      <Pressable onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={30} color="black" />
      </Pressable>
      <View>
        <Text style={headerStyles.text}>{screen}</Text>
      </View>
    </SafeAreaView>
  );
}

const headerStyles = StyleSheet.create({
  container: {
    position: "top",
    top: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
    elevation: 5,
    height:90,
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop:30,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  }
});
