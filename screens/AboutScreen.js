import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { COLORS, icons } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import { useNavigation } from "@react-navigation/native";

const AboutScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: "About Us",
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.chevronLeft}
          dimension="60%"
          handlePress={() => {
            console.log("Home");
            navigation.navigate("Home");
          }}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Job Portal</Text>
      <Text style={styles.description}>
        Explore thousands of job opportunities and take your career to new heights.
      </Text>
      {/* <Text style={styles.description}>
        Developed by: Md. Farhan Masud Shohag {"\n"}
        Contact: fsh69711@gmail.com {"\n"}
        GitHub: github.com/fms-byte
      </Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 32,
    marginBottom: 16,
  },
  developerInfo: {
    fontSize: 14,
    textAlign: "center",
  },
});

export default AboutScreen;
