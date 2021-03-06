import React, { useState, useMemo, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import FoldersDisplay from "./components/FoldersViewer/FoldersDisplay";
import NotesDisplay from "./components/NotesViewer/NotesDisplay";
import NotePad from "./components/NotePad/NotePad";
import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Settings from "./Settings";
import { UserNotes } from "./UserNotes";
import firebase from "firebase";
import 'firebase/auth'
import { getData } from "./handleData";

const Stack = createStackNavigator();

export default function App() {
	const [userData, setUserData] = useState({ user_reference: null, folders: [] });
	const [loggedIn, setLoggedIn] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		firebase.auth().onAuthStateChanged(async (user) => {
			if (!user) {
				setLoggedIn(false);
				setLoading(false);
				return;
			}

			await getData(userData, setUserData);
			setLoggedIn(true);
			setLoading(false);
		});
	}, []);

	const providerValue = useMemo(() => ({ userData, setUserData }), [userData, setUserData]);

	return !loggedIn && !loading ? (
		<UserNotes.Provider value={providerValue}>
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Register" component={Register} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</UserNotes.Provider>
	) : (
		<UserNotes.Provider value={providerValue}>
			<PaperProvider>
				<NavigationContainer>
					<Stack.Navigator>
						<Stack.Screen name="Folders" component={FoldersDisplay} />
						<Stack.Screen name="NotesDisplay" component={NotesDisplay} />
						<Stack.Screen name="Settings" component={Settings} />
						<Stack.Screen name="NotePad" component={NotePad} options={{ headerBackTitleVisible: true }} />
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>
		</UserNotes.Provider>
	);
}
