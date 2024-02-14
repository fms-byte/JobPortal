import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Pressable,
  Image,
  Share,
  Alert,
  ToastAndroid,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { collection, getDocs, getDoc, setDoc, doc } from "firebase/firestore";

import {
  Company,
  JobAbout,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../components/jobdetails/index";
import { COLORS, icons, SIZES, FONT } from "../constants/index";
import { auth, db } from "../firebase";
import { reload } from "firebase/auth";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetailsScreen = ({ route }) => {
  //const params = useSearchParams();
  const params = route.params;
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();

  const jobId = params.item.id;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [iconName, setIconName] = useState(icons.heartOutline);
  const appliedDate = new Date();
  const [jobMessage, setJobMessage] = useState("");

  const fetchSelectedJob = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "jobs"));

      const jobs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const filteredJobs = jobs.filter((job) => job.id === jobId);
      setData(filteredJobs);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: COLORS.lightWhite },
      headerShadowVisible: false,
      headerBackVisible: false,
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.chevronLeft}
          dimension="60%"
          handlePress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={icons.share}
          dimension="60%"
          handlePress={() => onShare()}
        />
      ),
      headerTitle: "",
    });

    fetchSelectedJob();
  }, []);

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchSelectedJob();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            title="Qualifications"
            points={data[0].requirements ?? ["N/A"]}
          />
        );

      case "About":
        return <JobAbout item={data[0]} />;

      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].responsibilities ?? ["N/A"]}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const handlePress = async () => {
    try {
      const docId = data[0].id;
      const docRef = doc(db, "appliedJobs", `${docId}`);
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        ToastAndroid.show("You have already applied for this job", ToastAndroid.SHORT);
      } else {
        await setDoc(docRef, {
          title: data[0].title,
          jobId: docId,
          appliedDate: appliedDate,
          expirationDate: data[0].expirationDate,
          userId: userId,
        });
        ToastAndroid.show("Job Applied Successfully", ToastAndroid.SHORT);
      }
    } catch (e) {
      ToastAndroid.show("Job Applied Error", ToastAndroid.SHORT);
      console.error("Job Applied Error: " + e);
    }
  };
  
  const saveJob = async () => {
    try {
      const docId = data[0].id;
      const docRef = doc(db, "savedJobs", `${docId}`);
      const docSnapshot = await getDoc(docRef);
      setIconName(icons.heart); // new icon name
      
      if (docSnapshot.exists()) {        
        ToastAndroid.show("You have already saved this job", ToastAndroid.SHORT);
      } else {
        await setDoc(docRef, {
          title: data[0].title,
          jobId: docId,
          savedDate: appliedDate,
          expirationDate: data[0].expirationDate,
          userId: userId,
        });
        ToastAndroid.show("Job Saved Successfully", ToastAndroid.SHORT);
      }
    } catch (error) {
      // handle error
      console.error(error);
    }
  };
  

  const onShare = () => {
    try {
      const result = Share.share({
        message: `${jobMessage} To Apply for this job Download our JobPortal App from Google PlayStore or AppStore. See https://play.google.com/store/search?q=jobportal or https://appstore.com/jobportal`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        //reload the page
        
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : data.length === 0 ? (
          <Text>No data available</Text>
        ) : (
          <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
            <Company
              companyLogo={data[0].image}
              jobTitle={data[0].title}
              companyName={data[0].company}
              location={data[0].location}
            />

            <JobTabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {displayTabContent()}
          </View>
        )}
      </ScrollView>

      <View style={styles.container}>
        <Pressable style={styles.likeBtn} onPress={saveJob}>
          <Image
            source={iconName}
            resizeMode="contain"
            style={styles.likeBtnImage}
          />
        </Pressable>

        {!isApplied && (
          <Pressable style={styles.applyBtn} onPress={handlePress}>
            <Text style={styles.applyBtnText}>Apply for Job</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SIZES.small,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  likeBtn: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#F37453",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnImage: {
    width: "40%",
    height: "40%",
    tintColor: "#F37453",
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FE7654",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
  applyBtnText2: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontFamily: FONT.bold,
  },
});
