import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

import { COLORS, icons } from "../constants/index";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: "Profile",
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.chevronLeft}
          dimension="60%"
          handlePress={() => {
            navigation.navigate("Home");
          }}
        />
      ),
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={icons.signout}
          dimension="70%"
          handlePress={() => {
            console.log("Logout");
            {
              handleSignOut;
            }
          }}
        />
      ),
    });

    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().email === auth.currentUser.email) {
          setUser(doc.data());
        }
      });
    };

    getUser();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          {/* <Image
            source={{
              uri: user?.photo,
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              marginBottom: 10,
            }}
          /> */}
          <Text style={styles.info}>{user?.firstname} {user?.lastname}</Text>
        </View>

        <View style={{ marginTop: 20, alignItems: "center" }}>
          <View style={styles.line}>
            <Text style={styles.label}>Email: </Text>
            <Text style={styles.info}>{user?.email}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.label}>Phone Number: </Text>
            <Text style={styles.info}>{user?.phone}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Background color for the entire screen
  },
  profileContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "80%",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  info: {
    fontSize: 16,
    marginBottom: 15,
    color: "#333",
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  signOutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "left",
  },
});
