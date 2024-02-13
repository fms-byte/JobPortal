import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  DrawerLayoutAndroid,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import DrawerScreen from "./DrawerScreen";
import Welcome from "../components/welcome/Welcome";
import PopularJob from "../components/popular/PopularJob";
import NearbyJobs from "../components/nearby/NearbyJobs";
import JobPostForm from "../components/jobPost/JobPostForm";
import { COLORS, FONT, SIZES, icons } from "../constants/index";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const drawer = useRef(null);

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <DrawerScreen />
      {/* <Button
        title="Close drawer"
        onPress={() => drawer.current.closeDrawer()}
      /> */}
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: "",
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.menu}
          dimension="60%"
          handlePress={() => {
            console.log("menu");
            drawer.current.openDrawer();
          }}
        />
      ),
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={icons.profile}
          dimension="70%"
          handlePress={() => {
            console.log("profile");
            navigation.navigate("Profile");
          }}
        />
      ),
    });
  }, [navigation]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // wait 2 seconds and set refreshing to false
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={"left"}
      renderNavigationView={navigationView}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <ScrollView showsVerticalScrollIndicator={false} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
          <View style={{ flex: 1, padding: SIZES.medium }}>
            <Welcome
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleClick={() => {
                if (searchTerm) {
                  navigation.navigate("Search", { searchTerm });
                  //setSearchTerm = null;
                }
              }}
            />
            <PopularJob />
            <NearbyJobs />
          </View>
        </ScrollView>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
