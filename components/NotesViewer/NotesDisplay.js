import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { NewNotePortal } from "./NotePortals";
import * as Haptics from "expo-haptics";
import styles from "./NotesDisplayStyles";
import NoteCard from "./NoteCard";
import { addNote } from "../../handleData";
import { UserNotes } from "../../UserNotes";

const NotesDisplay = ({ route, navigation }) => {
	const { userData, setUserData } = useContext(UserNotes);
	const [currentFolder, setCurrentFolder] = useState(null);
	const [currentDisplay, setCurrentDisplay] = useState(null);
	const [search, setSearch] = useState("");
	const [visible, setVisible] = useState(false);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button icon="plus" onPress={showDialog} mode="text" labelStyle={{ fontSize: 25 }} />,
			title: route.params.name,
		});
	}, [navigation]);

	useEffect(() => {
		const current = userData.folders.find((folder) => folder.folder_id === route.params.folderId);
		setCurrentFolder(current);
		setCurrentDisplay(Object.entries(current.notes));
	}, [userData]);

	useEffect(() => {
		if (currentFolder === null) return;
		let display = Object.entries(currentFolder.notes);
		let searchString = search.trim().toLowerCase();
		if (!searchString.length) {
			return setCurrentDisplay(display);
		}
		display = display.filter(([key, note]) => note.note_name.toLowerCase().match(searchString));
		setCurrentDisplay(display);
	}, [search]);

	const showDialog = () => {
		Haptics.selectionAsync();
		setVisible(true);
	};

	const addNewNote = async (newNote) => {
		hideDialog();
		await addNote(newNote, route.params.folderId, userData, setUserData);
		
	};

	const hideDialog = () => {
		setVisible(false);
	};

	return (
		<ScrollView>
			{visible && <NewNotePortal addNewNote={addNewNote} hideDialog={hideDialog} />}
			<TextInput label="Search" style={styles.searchbar} value={search} onChangeText={(text) => setSearch(text)} />

			{currentDisplay && (
				<View style={styles.notePreviews}>
					{currentDisplay.map(([key, note]) => (
						<NoteCard key={key} noteId={key} note={note} folderId={route.params.folderId} />
					))}
				</View>
			)}
		</ScrollView>
	);
};

export default NotesDisplay;
