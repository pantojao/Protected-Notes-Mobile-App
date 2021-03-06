import React, { useContext, useState, useEffect} from "react";
import { View, ScrollView, Platform } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import Folder from "./Folder";
import { UserNotes } from "../../UserNotes";
import styles from "./FolderStyles";
import * as Haptics from "expo-haptics";
import { addFolder } from "../../handleData";


import { AddFolderPortal } from "./FolderPortals";

const FoldersDisplay = ({ navigation }) => {
	const { userData, setUserData } = useContext(UserNotes);
	const [currentDisplay, setCurrentDisplay] = useState(null);
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState("");

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <IconButton icon="plus" color="blue" size={25} onPress={showDialog} />,
			headerLeft: () => (
				<IconButton
					icon="account-settings"
					color="blue"
					size={25}
					onPress={() => navigation.navigate("Settings")}
				/>
			),
		});
	}, [navigation]);

	useEffect(() => {
		if (!userData) return;
		let display = userData.folders;
		let searchString = search.trim().toLowerCase();

		if (!searchString.length) {
			setCurrentDisplay(display);
			return;
		}
		display = display.filter((folder) => folder.folder_name.toLowerCase().match(searchString));
		setCurrentDisplay(display);
	}, [search]);

	useEffect(() => {
		if (!userData) return;
		setCurrentDisplay(userData.folders);
	}, [userData, setUserData]);

	const showDialog = () => {
		if (Platform.OS === "ios" || Platform.OS === "android") Haptics.selectionAsync();
		setVisible(true);
	};

	const addNewFolder = async (newFolder) => {
		hideDialog();
		addFolder(newFolder, userData, setUserData);
	};

	const hideDialog = () => {
		setVisible(false);
	};

	return (
		<ScrollView>
			<TextInput label="Search" value={search} onChangeText={(text) => setSearch(text)} style={styles.searchbar} />
			{visible && <AddFolderPortal addNewFolder={addNewFolder} hideDialog={hideDialog} />}
			{currentDisplay && (
				<View style={styles.folderDisplay}>
					{currentDisplay.map((folder) => (
						<Folder key={folder.folder_id} folder={folder} />
					))}
				</View>
			)}
			
		</ScrollView>
	);
};

export default FoldersDisplay;
