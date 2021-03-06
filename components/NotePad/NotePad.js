import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { TextInput, ScrollView } from "react-native";
import { saveNoteContent } from "../../handleData";
import { IconButton } from "react-native-paper";

const NotePad = ({ route, navigation }) => {
	const { userData, setUserData } = useContext(UserNotes);
	const [noteContent, setNoteContent] = useState(null);
	const [editing, setEditing] = useState(false);
	const textInput = useRef(null);

	const ActionButton = () => {
		return editing ? (
			<IconButton icon="content-save" size={20} color="blue" onPress={saveContent} />
		) : (
			<IconButton icon="pencil" size={20} color="blue" onPress={() => setEditing(true)} />
		);
	};

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: route.params.name,
			headerRight: () => <ActionButton />,
		});
	}, [navigation, editing, noteContent]);

	useEffect(() => {
		if (!userData) return;
		const currentNote = userData.folders.find((folder) => folder.folder_id === route.params.folderId)["notes"][
			route.params.noteId
		];
		setNoteContent(currentNote.note_content);
	}, []);

	const saveContent = async () => {
		setEditing(false);
		await saveNoteContent(noteContent, route.params.noteId, route.params.folderId, userData, setUserData);
	};

	useEffect(() => {
		if (editing) textInput.current.focus();
	}, [editing]);

	return (
		<ScrollView style={styles.notesView}>
			<TextInput
				style={styles.textInput}
				multiline={true}
				placeholder="Press the edit button to start editing. Make sure to save your note."
				onChangeText={(text) => setNoteContent(text)}
				defaultValue={noteContent}
				editable={editing}
				ref={textInput}
			/>
		</ScrollView>
	);
};

export default NotePad;
