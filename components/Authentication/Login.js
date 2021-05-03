import React, { useState, useEffect } from "react";
import {View} from 'react-native'
import {Button, TextInput } from "react-native-paper";
import firebase from 'firebase'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signIn = async() => {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch(error) {
       console.log(error)
    }
  }

  return (
    <View>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)}/>
      <TextInput placeholder="email" onChangeText={(email) => setEmail(email)}/>
      <TextInput placeholder="paasword" secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
      <Button 
        onPress = {signIn}
        title="Login"
        color="red"
        mode="contained"
      />
      <Button title="Don't have an account?" mode="contained" color="blue" />
    </View>
  );
}
