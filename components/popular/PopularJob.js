import { StyleSheet, Text, View, Pressable, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

import { COLORS, FONT, SIZES } from "../../constants/index";
import PopularJobCard from "./PopularJobCard";

const PopularJob = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [popularJobs, setPopularJobs] = useState([]);

  useEffect(() => {
    const fetchPopularJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPopularJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting documents: ", error);
        setLoading(false);
      }
    };

    fetchPopularJobs();
  }, []);

  const renderPopularJobs = ({ item }) => {
    return (
      <PopularJobCard
        item={item}
        onPress={() => navigation.navigate("JobDetails", { jobId: item.id })}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <Pressable onPress={() => navigation.navigate("AllJobs")}>
          <Text style={styles.headerBtn}>View all</Text>
        </Pressable>
      </View>

      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <FlatList
            data={popularJobs}
            renderItem={renderPopularJobs}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default PopularJob;

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SIZES.medium,
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
  },
});
