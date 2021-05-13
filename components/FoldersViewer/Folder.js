import { useNavigation } from "@react-navigation/core";
import React, { useState, useContext } from "react";
import { deleteFolder, changeFolderName } from "../../handleData";
import { List, Card } from "react-native-paper";
import styles from "./FolderStyles";
import * as Haptics from "expo-haptics";
import { UserNotes } from "../../UserNotes";
import { FolderOptions } from "./FolderPortals";

const Folder = ({ folder }) => {
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const { userData, setUserData } = useContext(UserNotes);

	const showModal = () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		setVisible(true);
	};

	const hideModal = () => setVisible(false);

	const deleteThis = async () => {
		hideModal();
		await deleteFolder(folder.folder_id, userData, setUserData);
	};

	const renameFolder = async (newName) => {
		hideModal();
		await changeFolderName(folder.folder_id, newName, userData, setUserData);
	};

	const goToFolder = () => {
		Haptics.selectionAsync();
		navigation.navigate("NotesDisplay", {
			folderId: folder.folder_id,
			name: folder.folder_name,
		});
	};

	return (
		<>
			{visible && (
				<FolderOptions folder={folder} renameFolder={renameFolder} deleteThis={deleteThis} hideModal={hideModal} />
			)}

			<Card elevation={2} style={styles.folderItem} onLongPress={showModal} onPress={goToFolder}>
				<Card.Title title={folder.folder_name} right={() => <List.Icon icon="arrow-right" />} />
			</Card>
		</>
	);
};

export default Folder;
