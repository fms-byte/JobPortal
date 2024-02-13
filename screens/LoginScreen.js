//login/index.js
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Pressable,
  ToastAndroid,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, [navigation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigation.navigate("Home");
          ToastAndroid.show("Login Successfull!", ToastAndroid.SHORT);
        } else {
          console.log("Invalid email or password");
          ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
        }
      })
      .catch((error) => {
        console.log(error.message);
        ToastAndroid.show("Invalid email or password", ToastAndroid.SHORT);
      });
  };

  useEffect(() => {
    try {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigation.replace("Home");
        }
      });
      return unsubscribe;
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/icon.png")} />
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>

        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
          />
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
          />
        </View>

        <Pressable onPress={handleLoginPress} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.or}>OR</Text>

        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.createAccountButton}
        >
          <Text style={styles.buttonText}>Create an Account</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: -10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#FF7754",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginBottom: 10,
  },
  createAccountButton: {
    backgroundColor: "#312651",
    padding: 10,
    borderRadius: 5,
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  or: {
    color: "#999",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Login;
