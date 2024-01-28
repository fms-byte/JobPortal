import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Pressable,
  ToastAndroid,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import DatePicker, {
  getFormatedDate,
} from "react-native-modern-datepicker";
import {Picker} from '@react-native-picker/picker';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { db, auth } from "../../firebase";
import { COLORS, FONT, Types } from "../../constants/index";
import { setDoc, doc } from "firebase/firestore";

const JobPostForm = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState([]);
  const [salary, setSalary] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState("");
  const postedDate = new Date();

  

  const handleJobTypeChange = (itemValue) => {
    setSelectedJobType(itemValue);
  };

  const startDate = getFormatedDate(
    postedDate.setDate(postedDate.getDate()),
    "YYYY/MM/DD"
  );

  const [date, setDate] = useState(postedDate, "YYYY/MM/DD");

  const handlePress = () => {
    setOpen(!open);
  };

  const handleChange = (selectedDate) => {
    console.log(selectedDate);
    setOpen(false);
    setDate(selectedDate);
    setExpirationDate(selectedDate.toString().split("T")[0]);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const savePost = () => {
    if (
      title === "" ||
      company === "" ||
      location === "" ||
      description === "" ||
      requirements === "" ||
      salary === "" ||
      expirationDate === "" ||
      image === "" ||
      selectedJobType === ""
    ) {
      ToastAndroid.show("Please Enter all the credentials", ToastAndroid.SHORT);
      return;
    }

    const currentTimeStampInSecond = Math.floor(Date.now() / 1000);
    const docId = currentTimeStampInSecond.toString();
    
    const docRef = doc(db, "jobs", `${docId}`);
    setDoc(docRef, {
      title: title,
      company: company,
      location: location,
      description: description,
      requirements: requirements,
      salary: salary,
      postedDate: postedDate,
      expirationDate: date,
      image: image,
      userId: userId,
      type: selectedJobType,
    });
    ToastAndroid.show("Job Posted Successfully", ToastAndroid.SHORT);
    setTitle("");
    setCompany("");
    setLocation("");
    setDescription("");
    setRequirements("");
    setSalary("");
    setExpirationDate("");
    setImage("");
    setSelectedJobType("");

    navigation.replace("Home");

  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder="Enter title"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Company</Text>
          <TextInput
            style={styles.input}
            value={company}
            onChangeText={(text) => setCompany(text)}
            placeholder="Enter company"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={(text) => setLocation(text)}
            placeholder="Enter location"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Enter description"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Requirements</Text>
          <TextInput
            style={styles.input}
            value={requirements.join(", ")}
            onChangeText={(text) =>
              setRequirements(
                text
                  .trim()
                  .split(",")
                  .map((item) => item.trim())
              )
            }
            placeholder="Enter requirements"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Salary</Text>
          <TextInput
            style={styles.input}
            value={salary}
            onChangeText={(text) => setSalary(text)}
            placeholder="Enter salary"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Expiration Date</Text>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent:"space-between" }}>
            <TextInput
              style={styles.input}
              value={expirationDate}
              onChangeText={(text) => setExpirationDate(text)}
              placeholder="Enter expiration date"
            />
            <Pressable onPress={handlePress}>
              <FontAwesome name="calendar" size={36} color="black" style={{marginLeft: 5, padding: 5}}/>
            </Pressable>
            <Modal visible={open} animationType="slide" transparent={true}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <DatePicker
                    mode="calendar"
                    current={startDate}
                    minimumDate={startDate}
                    selected={date}
                    onDateChange={handleChange}
                    onCancel={handlePress}
                  />
                  <Pressable onPress={handlePress}>
                    <Text>Close</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image</Text>
          <TextInput
            style={styles.input}
            value={image}
            onChangeText={(text) => setImage(text)}
            placeholder="Enter image link"
          />
        </View>
        {/* drop down of Types */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Job Type</Text>
          <Picker
            selectedValue={selectedJobType}
            onValueChange={handleJobTypeChange}
            style={styles.input}
          >
            {Types.map((type, index) => (
              <Picker.Item key={index} label={type} value={type} />
            ))}
          </Picker>
        </View>
        
        <Pressable style={styles.button} onPress={savePost}>
          <Text style={styles.buttonText}>POST</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    justifyContent: "center",
  },
  inputContainer: {
    marginBottom: 5,
  },
  label: {
    marginBottom: 1,
    ...FONT.body4,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    marginTop: 2,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
    padding: 5,
    ...FONT.body3,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: COLORS.white,
    ...FONT.h3,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default JobPostForm;
