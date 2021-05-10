import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

import firebase from "firebase";

import { useNavigation } from "@react-navigation/native";
import styles from "./AuthenticationStyles";

export default function Login() {
	const [email, setEmail] = useState("");
	const [emailLabel, setEmailLabel] = useState(null);
	const [password, setPassword] = useState("");
	const navigation = useNavigation();

	const signIn = async () => {
		try {
			const response = await firebase.auth().signInWithEmailAndPassword(email, password);
		} catch (error) {
			setEmailLabel("Email or password is invalid.");
		}
	};
	const redirectToRegister = (response) => {
		navigation.navigate("Register");
	};
	const removeLabels = () => setEmailLabel(null);

	return (
		<View>
			<TextInput
				style={styles.loginInputs}
				label={emailLabel}
				error={emailLabel}
				onFocus={removeLabels}
				placeholder="Email"
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				style={styles.loginInputs}
				placeholder="Password"
				secureTextEntry={true}
				onFocus={removeLabels}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button onPress={signIn} color="#2196f3" dark={true} style={styles.loginBtn} mode="contained">
				Login
			</Button>
			<Button mode="Text" color="red" onPress={redirectToRegister}>
				Don't Have An Account?
			</Button>
		</View>
	);
}
