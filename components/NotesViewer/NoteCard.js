import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/core";
import { Card, Modal, Portal, Text, Button } from "react-native-paper";
import styles from "./NotesDisplayStyles";
import * as Haptics from "expo-haptics";
import { UserNotes } from "../../UserNotes";
import { moveNote, deleteNote, changeNoteName } from "../../handleData";
import { NoteOptions } from "./NotePortals";

const NotesCard = ({ noteId, note, folderId }) => {
	const [visible, setVisible] = useState(false);
	const { userData, setUserData } = useContext(UserNotes);
	const navigation = useNavigation();

	const showModal = () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		setVisible(true);
	};

	const hideModal = () => setVisible(false);
	const openNotePad = () => {
		Haptics.selectionAsync();
		navigation.navigate("NotePad", {
			noteId: noteId,
			folderId: folderId,
			name: note.note_name,
		});
	};

	const deleteThis = async () => {
		await deleteNote(noteId, folderId, userData, setUserData);
		hideModal();
	};

	const editNoteName = async (newName) => {
		console.log(newName);
		changeNoteName(newName, noteId, folderId, userData, setUserData);
		hideModal();
	};

	const moveThisNote = async (folderDesination) => {
		await moveNote(note, noteId, folderId, folderDesination, userData, setUserData);
		hideModal();
	};

	return (
		<>
			{visible && (
				<NoteOptions
					noteName={note.note_name}
					hideModal={hideModal}
					editNoteName={editNoteName}
					deleteThis={deleteThis}
					moveNote={moveThisNote}
				/>
			)}

			<Card style={styles.noteCard} onPress={openNotePad} onLongPress={showModal} elevation={2}>
				<Card.Title
					titleStyle={{
						fontSize: 15,
					}}
					title={note.note_name}
				/>
			</Card>
		</>
	);
};

export default NotesCard;
