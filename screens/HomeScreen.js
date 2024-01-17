import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomHeaderButton from "../components/common/header/CustomHeaderButton";
import DrawerScreen from "./DrawerScreen";

const HomeScreen = () => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerStyle: { backgroundColor: "white" },
  //     headerShadowVisible: false,
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <CustomHeaderButton
  //         title=""
  //         iconName="bars" // Dynamically pass the icon name
  //         onPress={() => {
  //           console.log("Menu");
  //         }}
  //       />
  //     ),
  //     headerRight: () => (
  //       <CustomHeaderButton
  //         title=""
  //         iconName="user" // Dynamically pass the icon name
  //         onPress={() => {
  //           console.log("Profile");
  //         }}
  //       />
  //     ),
  //   });
  // }, []);

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "gray" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, padding: "10px" }}>
            <Text> HomeScreen </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
