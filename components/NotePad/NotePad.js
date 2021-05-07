import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./NotePadStyles";
import { UserNotes } from "../../UserNotes";
import { TextInput, Button, ScrollView } from "react-native";
import { saveNoteContent } from "../../handleData";

const NotePad = ({ route, navigation }) => {
	const { userData, setUserData } = useContext(UserNotes);
	const [noteContent, setNoteContent] = useState(null);
	const [editing, setEditing] = useState(false);
	const textInput = useRef(null);

	const ActionButton = () => {
		return editing ? (
			<Button onPress={saveContent} title="Done" />
		) : (
			<Button onPress={() => setEditing(true)} title="Edit" />
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
		await saveNoteContent(noteContent, route.params.noteId, route.params.folderId, userData, setUserData);
		setEditing(false);
	};

	useEffect(() => {
		if (editing) textInput.current.focus();
	}, [editing]);

	return (
		<ScrollView style={styles.notesView}>
			<TextInput
				style={styles.textInput}
				multiline={true}
				placeholder="Type here"
				onChangeText={(text) => setNoteContent(text)}
				defaultValue={noteContent}
				editable={editing}
				ref={textInput}
			/>
		</ScrollView>
	);
};

export default NotePad;
