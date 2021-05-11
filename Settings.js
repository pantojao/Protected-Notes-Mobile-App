import React, { useState, useMemo, useEffect } from "react";
import { ToggleButton, Switch, Button } from "react-native-paper";
import { Text, View } from "react-native";
import { UserNotes } from "./UserNotes";
import * as firebase from "firebase";

const Settings = () => {
	const [sessionPersistance, setSessionPersistence] = useState(false);
    

	useEffect(() => {
		console.log(firebase.auth.Auth.Persistence.NONE);
	}, []);

	const changePersistance = async () => {
		setSessionPersistence(!sessionPersistance);

		if (setSessionPersistence) {
			await firebase.auth().setPersistance(firebase.auth.Auth.Persistence.NONE);
		} else {
			await firebase.auth().setPersistance(firebase.auth.Auth.Persistence.SESSION);
		}
	};

	const changePassword = () => {

    };

	const logout = async () => {
		await firebase.auth().signOut();
	};

	return (
		<View>
			<Button onPress={changePassword}>Change Password</Button>
			<Button onPress={logout}>Logout</Button>
		</View>
	);
};

export default Settings;
