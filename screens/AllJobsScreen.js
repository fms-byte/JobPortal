import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { db, auth } from "../firebase";
import { COLORS, FONT, SIZES, icons } from "../constants";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";
import NearbyJobCard from "../components/nearby/NearbyJobCard";

const AllJobsScreen = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const docName = route.params.table;
  const screenName = route.params.name;
  console.log(docName, screenName);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerTitle: `${screenName}`,
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.chevronLeft}
          dimension="60%"
          handlePress={() => {
            console.log("Home");
            navigation.goBack();
          }}
        />
      ),
    });

    const fetchPopularJobs = async () => {
      try {
        if (docName === "jobs") {
          const querySnapshot = await getDocs(collection(db, docName));
          const jobsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setJobs(jobsData);
          setLoading(false);
        } else if (docName === "appliedJobs") {
          const userId = auth.currentUser.uid;
          const appliedJobsSnapshot = await getDocs(
            collection(db, "appliedJobs")
          );
          const jobsData = appliedJobsSnapshot.docs
            .filter((doc) => doc.data().userId === userId)
            .map((doc) => doc.data());

          setJobs(jobsData);
          setLoading(false);
        } else if (docName === "postedJobs"){
            const userId = auth.currentUser.uid;
            const postedJobsSnapshot = await getDocs(
                collection(db, "jobs")
            );
            const jobsData = postedJobsSnapshot.docs
                .filter((doc) => doc.data().userId === userId)
                .map((doc) => ({
                id: doc.id,
                ...doc.data(),
                }));
            setJobs(jobsData);
            setLoading(false);
        } else if (docName === "savedJobs") {
            const userId = auth.currentUser.uid;
            const savedJobsSnapshot = await getDocs(
                collection(db, "savedJobs")
            );
            const jobsData = savedJobsSnapshot.docs
                .filter((doc) => doc.data().userId === userId)
                .map((doc) => doc.data());
    
            setJobs(jobsData);
            setLoading(false);
        }
      } catch (error) {
        console.error("Error getting documents: ", error);
        setLoading(false);
      }
    };

    fetchPopularJobs();
  }, []);

  const renderJobItem = ({ item }) => {
    const jobId = item.id;
    return (
      <NearbyJobCard
        item={item}
        onPress={() => {
          navigation.navigate("JobDetails", { jobId });
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJobItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardsContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardsContainer: {
    padding: SIZES.medium,
  },
});

export default AllJobsScreen;
