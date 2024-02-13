import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Modal,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { COLORS, icons } from "../constants/index";
import ScreenHeaderBtn from "../components/common/header/ScreenHeaderBtn";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const [appliedJobData, setAppliedJobData] = useState([]);
  const [savedJob, setSavedJob] = useState([]);
  const [postedJob, setPostedJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const handleSignOut = async () => {
    setShowModal(true);
  };

  const confirmSignOut = async () => {
    try {
      await auth.signOut();
      ToastAndroid.show("Signed out successfully", ToastAndroid.SHORT);
      navigation.replace("Login");
    } catch (error) {
      ToastAndroid.show(`Signed out error: ${error}`, ToastAndroid.SHORT);
      console.error("Error signing out:", error);
    }
  };

  const handleViewAll = () => {
    console.log("View all");
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
            navigation.replace("Home");
          }}
        />
      ),
    });

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        let userId;
        querySnapshot.forEach((doc) => {
          if (doc.data().email === auth.currentUser.email) {
            setUser(doc.data());
            userId = auth.currentUser.uid;
            setUserId(userId);
          }
        });

        if (!userId) {
          console.error("User ID not found.");
          return;
        }

        const appliedJobsSnapshot = await getDocs(
          collection(db, "appliedJobs")
        );
        const appliedJobsData = appliedJobsSnapshot.docs
          .filter((doc) => doc.data().userId === userId)
          .map((doc) => doc.data());

        const savedJobsSnapshot = await getDocs(collection(db, "savedJobs"));
        const savedJobsData = savedJobsSnapshot.docs
          .filter((doc) => doc.data().userId === userId)
          .map((doc) => doc.data());

        const postedJobsSnapshot = await getDocs(collection(db, "jobs"));
        const postedJobsData = postedJobsSnapshot.docs
          .filter((doc) => doc.data().userId === userId)
          .map((doc) => doc.data());

        setAppliedJobData(appliedJobsData);
        setSavedJob(savedJobsData);
        setPostedJob(postedJobsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color={COLORS.primary} />;
  }

  return (
    <>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.userHeading}>User's Information</Text>
        <View style={styles.userInfoContainer}>
          {/* <Image
            source={{
              uri: user?.photo,
            }}
            style={styles.userImage}
          /> */}
          <Text style={styles.userName}>
            {user?.firstname} {user?.lastname}
          </Text>
        </View>
        <View style={styles.infoContainer}>
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

      <View style={styles.profileContainer1}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Applied Jobs Information</Text>
          <Pressable style={styles.viewAllBtn} onPress={handleViewAll}>
            <Text style={styles.viewAllBtnText}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.line}>
            <Text style={styles.label}>Total Jobs Applied: </Text>
            <Text style={styles.info}>{appliedJobData?.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileContainer2}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Posted Jobs Information</Text>
          <Pressable style={styles.viewAllBtn} onPress={handleViewAll}>
            <Text style={styles.viewAllBtnText}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.line}>
            <Text style={styles.label}>Total Jobs Posted: </Text>
            <Text style={styles.info}>{postedJob?.length}</Text>
          </View>
        </View>
      </View>

      <View style={styles.profileContainer3}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Saved Jobs Information</Text>
          <Pressable style={styles.viewAllBtn} onPress={handleViewAll}>
            <Text style={styles.viewAllBtnText}>View all</Text>
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.line}>
            <Text style={styles.label}>Total Jobs Saved: </Text>
            <Text style={styles.info}>{savedJob?.length}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.btn} onPress={handleSignOut}>
        <Text style={styles.btnText}>
          Sign Out <FontAwesome5 name="sign-out-alt" size={18} color="#fff" />
        </Text>
      </Pressable>
    </ScrollView>
    <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', width: '80%', padding: 20, borderRadius: 10 }}>
            <Text style={{fontSize: 18 }}>Are you sure?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Pressable onPress={() => setShowModal(false)}>
                <Text style={{fontSize: 16 }}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmSignOut}>
                <Text style={{ color: 'red',fontSize: 16 }}>Yes, Sign Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  profileContainer: {
    padding: 20,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#EEF5FF",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer1: {
    padding: 20,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#CDFADB",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer2: {
    padding: 20,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#B4D4FF",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileContainer3: {
    padding: 20,
    width: "90%",
    borderRadius: 15,
    backgroundColor: "#FFC0D9",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  userInfoContainer: {
    alignItems: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
    marginTop: 20,
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
  btn: {
    marginTop: 15,
    backgroundColor: "#D80032",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewAllBtn: {
    padding: 4,
    borderRadius: 50,
  },
  viewAllBtnText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
});
