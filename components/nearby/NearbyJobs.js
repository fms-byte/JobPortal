import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Pressable,
  FlatList
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { COLORS, FONT, SIZES, icons, Types } from "../../constants/index";
import NearbyJobCard from "./NearbyJobCard";

const NearbyJobs = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [nearbyJobs, setNearbyJobs] = useState([]);

  useEffect(() => {
    const fetchNearbyJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNearbyJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting documents: ", error);
        setLoading(false);
      }
    };

    fetchNearbyJobs();
  }, []);

  const renderNearbyJobs = ({ item }) => {
    return (
      <NearbyJobCard
        item={item}
        onPress={() => navigation.navigate("JobDetails", { jobId: item.id })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Nearby");
          }}
        >
          <Text style={styles.headerBtn}>View all</Text>
        </Pressable>
      </View>
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={nearbyJobs}
            renderItem={renderNearbyJobs}
            keyExtractor={(item) => item.id}
            verticle
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default NearbyJobs;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SIZES.small,
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
    gap: SIZES.small,
  },
});
