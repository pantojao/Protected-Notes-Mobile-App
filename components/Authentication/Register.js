import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid).set({
            name, 
            email, 
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="paasword"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button onPress={signUp} title="Sign Up" color="blue" mode="contained" />
    </View>
  );
}
