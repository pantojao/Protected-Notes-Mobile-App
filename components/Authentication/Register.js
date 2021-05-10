import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import firebase from "firebase";
import styles from "./AuthenticationStyles";
export default function Register({ navigation }) {
	const [email, setEmail] = useState("");
	const [emailLabel, setEmailLabel] = useState(null);
	const [password, setPassword] = useState("");
	const [passwordLabel, setPasswordLabel] = useState(null);
	const [name, setName] = useState("");

	const signUp = async () => {
		try {
			const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
			firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
				name,
				email,
			});
			navigation.goBack();
		} catch (error) {
			validateInfo(error);
		}
	};

	const validateInfo = (error) => {
		switch (error.code) {
			case "auth/email-already-in-use":
				setEmailLabel(error.message);
				break;
			case "auth/invalid-email":
				setEmailLabel(error.message);
				break;
			case "auth/weak-password":
				setPasswordLabel(error.message);
				break;
			default:
				console.log("Unexpected Error");
		}
	};

	return (
		<View>
			<TextInput style={styles.loginInputs} placeholder="Name" onChangeText={(name) => setName(name)} />
			<TextInput
				style={styles.loginInputs}
				placeholder="Email"
				onChangeText={(email) => setEmail(email)}
				label={emailLabel}
				onFocus={() => setEmailLabel(null)}
				error={emailLabel}
			/>

			<TextInput
				placeholder="Password"
				style={styles.loginInputs}
				onFocus={() => setPasswordLabel(null)}
				secureTextEntry={true}
				error={passwordLabel}
				label={passwordLabel}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button style={styles.loginBtn} onPress={signUp} color="#2196f3" dark={true} mode="contained">
				Register
			</Button>
		</View>
	);
}
