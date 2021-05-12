import { useNavigation } from "@react-navigation/core";
import React, { useState, useContext } from "react";

import { List, Card } from "react-native-paper";
import styles from "./FolderStyles";
import * as Haptics from "expo-haptics";
import { UserNotes } from "../../UserNotes";
import { FolderOptions } from "./FolderPortals";

const Folder = ({ folder, deleteThis, renameFolder }) => {
	const navigation = useNavigation();
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		setVisible(true);
	};

	const hideModal = () => setVisible(false);

	const goToFolder = () => {
		Haptics.selectionAsync();
		navigation.navigate("NotesDisplay", {
			folderId: folder.folder_id,
			name: folder.folder_name,
		});
	};

	const deleteThisFolder = () => {
		deleteThis(folder.folder_id)
		hideModal()
	}

	const renameThisFolder = (newName) => {	
		renameFolder(newName, folder.folder_id)
		hideModal()
	}

	return (
		<>
			{visible && (
				<FolderOptions folder={folder} renameFolder={renameThisFolder} deleteThis={deleteThisFolder} hideModal={hideModal} />
			)}

			<Card elevation={2} style={styles.folderItem} onLongPress={showModal} onPress={goToFolder}>
				<Card.Title title={folder.folder_name} right={() => <List.Icon icon="arrow-right" />} />
			</Card>
		</>
	);
};

export default Folder;
