import { StyleSheet, Text, View, Pressable, ToastAndroid } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import JobPostForm from "../components/jobPost/JobPostForm";
import { SIZES, icons, COLORS, FONT } from "../constants";
import DrawerItems from "../constants/DrawerItems";

const DrawerScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navigateToScreen = (screenName) => {
    if (screenName === "Logout") {
      handleSignOut();
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <View style={styles.container}>
      {DrawerItems.map((item, index) => (
        <Pressable
          key={index}
          style={styles.link}
          onPress={() => navigateToScreen(item.screenName)}
        >
          {item.iconType === "FontAwesome5" && (
            <FontAwesome5
              name={item.iconName}
              size={SIZES.xxLarge}
              color={COLORS.primary}
              style={styles.Icon}
            />
          )}
          {item.iconType === "Feather" && (
            <Feather
              name={item.iconName}
              size={SIZES.xxLarge}
              color={COLORS.primary}
              style={styles.Icon}
            />
          )}
          {item.iconType === "MaterialIcons" && (
            <MaterialIcons
              name={item.iconName}
              size={SIZES.xxLarge}
              color={COLORS.primary}
              style={styles.Icon}
            />
          )}
          <Text style={styles.text}>{item.name}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "left",
  },
  link: {
    margin: 5,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.tertiary,
    borderRadius: 15,
  },
  Icon: {
    marginRight: 20,
    marginLeft: 10,
  },
  text: {
    fontFamily: FONT.regular,
    color: COLORS.white,
    fontSize: 20,
  },
});

export default DrawerScreen;
