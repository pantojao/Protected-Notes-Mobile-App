import React, { useState, useMemo, useEffect } from "react";
import { ToggleButton, Switch, Button, Portal, Dialog, Paragraph } from "react-native-paper";
import { Text, View } from "react-native";
import * as firebase from "firebase";

const Settings = () => {
	const [visible, setVisible] = useState(false);

	const changePassword = async () => {
		const auth = firebase.auth();
		const emailAddress = auth.currentUser.email;
		
		setVisible(true);
		await auth.sendPasswordResetEmail(emailAddress);
	};

	const logout = async () => {
		await firebase.auth().signOut();
	};

	return (
		<>
			<Portal>
				<Dialog visible={visible} onDismiss={() => setVisible(false)}>
					<Dialog.Content>
						<Paragraph>A password reset has been sent to your email.</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setVisible(false)}>Done</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<View style={{ justifyContent: "space-evenly", height: "90%" }}>
				<Button onPress={changePassword}>Reset Password</Button>
				<Button onPress={logout} color="red" mode="contained" style={{ width: 100, alignSelf: "center" }}>
					Logout
				</Button>
			</View>
		</>
	);
};

export default Settings;
