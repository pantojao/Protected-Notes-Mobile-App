import React, { useContext, useState, useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Folder from "./Folder";
import { UserNotes } from "../../UserNotes";
import styles from "./FolderStyles";
import * as Haptics from "expo-haptics";
import { addFolder } from "../../handleData"
import { deleteFolder, changeFolderName } from "../../handleData";

import { AddFolderPortal } from "./FolderPortals";

const FoldersDisplay = ({ navigation }) => {
	const { userData, setUserData } = useContext(UserNotes)
	const [currentDisplay, setCurrentDisplay] = useState(null);
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState("");


	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button icon="plus" mode="text" labelStyle={{ fontSize: 25 }} onPress={showDialog} />,
			headerLeft: () => (
				<Button
					icon="account-settings"
					mode="text"
					labelStyle={{ fontSize: 25 }}
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
		if (!userData) return  
		console.log("runing")
		setCurrentDisplay(userData.folders);
	}, [userData, setUserData]);

	const showDialog = () => {
		Haptics.selectionAsync();
		setVisible(true);
	};

	const addNewFolder = async (newFolder) => {
		addFolder(newFolder, userData, setUserData);
		hideDialog();
	};

	const deleteThis = async (folderID) => {
		deleteFolder(folderID, userData, setUserData);
	};

	const renameFolder = async (newName, folderId) => {
		changeFolderName(folderId, newName, userData, setUserData);
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
						<Folder key={folder.folder_id} folder={folder} deleteThis={deleteThis} renameFolder={renameFolder} />
					))}
				</View>
			)}
		</ScrollView>
	);
};

export default FoldersDisplay;
